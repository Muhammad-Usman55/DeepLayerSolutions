import os
from PIL import Image

def generate_icons():
    source_path = "public/logo/logo.png"
    if not os.path.exists(source_path):
        raise FileNotFoundError(f"Source logo not found at {source_path}")
    
    img = Image.open(source_path).convert("RGBA")
    print(f"Loaded master logo from {source_path}: size {img.size}")

    # Sizes to generate in public/
    targets = {
        "public/favicon-48x48.png": (48, 48),
        "public/favicon-96x96.png": (96, 96),
        "public/favicon-144x144.png": (144, 144),
        "public/icon-192.png": (192, 192),
        "public/icon-512.png": (512, 512),
        "public/icon-32.png": (32, 32),
        "public/apple-touch-icon.png": (180, 180),
        "public/apple-icon.png": (180, 180),
        "src/app/icon.png": (512, 512),
        "src/app/apple-icon.png": (180, 180),
    }

    for path, size in targets.items():
        os.makedirs(os.path.dirname(path), exist_ok=True)
        resized = img.resize(size, Image.Resampling.LANCZOS)
        resized.save(path, format="PNG", optimize=True)
        print(f"Generated {path} ({size[0]}x{size[1]})")

    # Generate multi-resolution favicon.ico with 48x48 as primary
    ico_sizes = [(48, 48), (32, 32), (16, 16)]
    ico_targets = ["public/favicon.ico", "src/app/favicon.ico"]
    
    for ico_path in ico_targets:
        img.save(
            ico_path,
            format="ICO",
            sizes=ico_sizes
        )
        print(f"Generated multi-res {ico_path} with sizes {ico_sizes}")

if __name__ == "__main__":
    generate_icons()
