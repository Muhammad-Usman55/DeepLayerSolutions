import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

function escapeCsvField(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(req: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const supabase = createAdminClient();
    const { data: rows, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[INQUIRIES CSV EXPORT ERROR]:", error);
      return NextResponse.json(
        { success: false, message: "Database query error during export." },
        { status: 500 }
      );
    }

    const headers = [
      "Reference Number",
      "Full Name",
      "Email",
      "Company",
      "Service",
      "Subject",
      "Message",
      "Status",
      "Admin Notes",
      "Created At",
    ];

    const csvLines = [headers.join(",")];

    (rows || []).forEach((row) => {
      const line = [
        escapeCsvField(row.reference_number),
        escapeCsvField(row.full_name),
        escapeCsvField(row.email),
        escapeCsvField(row.company || ""),
        escapeCsvField(row.service || ""),
        escapeCsvField(row.subject),
        escapeCsvField(row.message),
        escapeCsvField(row.status),
        escapeCsvField(row.admin_notes || ""),
        escapeCsvField(row.created_at),
      ].join(",");
      csvLines.push(line);
    });

    const csvContent = "\uFEFF" + csvLines.join("\r\n"); // UTF-8 BOM for Excel compatibility
    const filename = `deeplayer-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error: any) {
    console.error("[CSV EXPORT EXCEPTION]:", error?.message || error);
    return NextResponse.json(
      { success: false, message: "Export generation failed." },
      { status: 500 }
    );
  }
}

