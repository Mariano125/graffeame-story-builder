import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_story(
    image_path,
    headline="TU MATE, TU HISTORIA 🧉✨",
    subtext="Grabado láser 100% personalizado.",
    cta="Escribinos por MP 📩",
    badge="GRABADO LÁSER ⚡",
    output_path="story_output.png"
):
    # Canvas Size 1080x1920
    W, H = 1080, 1920

    if os.path.exists(image_path):
        product_img = Image.open(image_path).convert("RGBA")
    else:
        # Placeholder image
        product_img = Image.new("RGBA", (800, 800), (40, 50, 70, 255))

    # Background: blurred product image
    bg = product_img.resize((W + 200, H + 200))
    bg = bg.filter(ImageFilter.GaussianBlur(35))
    canvas = bg.crop((100, 100, W + 100, H + 100))

    # Dark overlay
    overlay = Image.new("RGBA", (W, H), (15, 23, 42, 100))
    canvas = Image.alpha_composite(canvas, overlay)

    # Paste Product Image Centered
    # Fit inside 900x1000
    product_img.thumbnail((900, 1000), Image.Resampling.LANCZOS)
    p_w, p_h = product_img.size
    px = (W - p_w) // 2
    py = (H - p_h) // 2 - 80
    canvas.paste(product_img, (px, py), product_img if product_img.mode == 'RGBA' else None)

    # Draw Text & Overlays
    draw = ImageDraw.Draw(canvas)

    # Top Branding Text
    draw.text((80, 120), "GRAFFEAME", fill=(255, 255, 255, 255))
    draw.text((80, 170), "GRABADOS LÁSER & PERSONALIZADOS", fill=(212, 175, 55, 255))
    draw.text((W - 280, 130), "@graffeame", fill=(255, 255, 255, 255))

    # Save output
    canvas.save(output_path)
    print(f"Historia generada con éxito: {output_path}")

if __name__ == "__main__":
    print("Script de generación de historias en Python de @graffeame activo.")
