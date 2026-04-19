"""
Generate brand assets used by social previews and home-screen icons.

Outputs:
  public/og-image.png           1200x630 social sharing card (Open Graph)
  public/apple-touch-icon.png   180x180 iOS home-screen icon
  public/icon-192.png           192x192 PWA / Android icon
  public/icon-512.png           512x512 PWA splash / large icon

Run:  python3 scripts/build-share-card.py

Re-run any time branding text or the logo changes. The outputs are committed
to git so the same files are served at https://curlupclub.com/<file> to
all link previewers (Facebook, WhatsApp, iMessage, Slack, LinkedIn, X) and
to mobile platforms when the site is added to a home screen.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "public" / "images" / "brand" / "curl-up-club-logo.png"
OUT = ROOT / "public" / "og-image.png"

WIDTH, HEIGHT = 1200, 630

SAGE_DEEP = (40, 48, 38)
SAGE = (75, 86, 71)
SAGE_SOFT = (95, 108, 90)
CREAM = (243, 234, 215)
CREAM_DIM = (210, 202, 184)
APRICOT = (233, 176, 122)

BRAND_NAME = "Curl Up Club"
BRAND_SUB = "Cat Sitting"
TAGLINE = "Cat Sitting in and around the Dee Valley"
AREAS = "Llangollen  ·  Chirk  ·  Ruabon  ·  Wrexham  ·  Gobowen"
URL = "curlupclub.com"

SERIF_BOLD = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
SERIF_ITALIC = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
SANS = "/System/Library/Fonts/Avenir Next.ttc"
SCRIPT = "/System/Library/Fonts/Supplemental/Apple Chancery.ttf"


def load_font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    if path.endswith(".ttc"):
        return ImageFont.truetype(path, size, index=index)
    return ImageFont.truetype(path, size)


def make_background() -> Image.Image:
    img = Image.new("RGB", (WIDTH, HEIGHT), SAGE_DEEP)
    overlay = Image.new("RGB", (WIDTH, HEIGHT), SAGE)
    mask = Image.new("L", (WIDTH, HEIGHT), 0)
    md = ImageDraw.Draw(mask)
    for y in range(HEIGHT):
        alpha = int(255 * (1 - (y / HEIGHT) * 0.55))
        md.line([(0, y), (WIDTH, y)], fill=alpha)
    img.paste(overlay, (0, 0), mask)
    return img


def draw_decorative_frame(draw: ImageDraw.ImageDraw) -> None:
    margin = 28
    draw.rounded_rectangle(
        [margin, margin, WIDTH - margin, HEIGHT - margin],
        radius=22,
        outline=(120, 132, 110),
        width=2,
    )
    bar_w = 74
    bar_h = 6
    cx = WIDTH // 2
    draw.rounded_rectangle(
        [cx - bar_w // 2, HEIGHT - margin - 30, cx + bar_w // 2, HEIGHT - margin - 30 + bar_h],
        radius=3,
        fill=APRICOT,
    )


def paste_logo(canvas: Image.Image) -> None:
    logo = Image.open(LOGO).convert("RGBA")
    target_h = 440
    ratio = target_h / logo.height
    target_w = int(logo.width * ratio)
    logo = logo.resize((target_w, target_h), Image.LANCZOS)

    mask = Image.new("L", logo.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, logo.size[0], logo.size[1]],
        radius=int(min(logo.size) * 0.5),
        fill=255,
    )

    pad = 14
    bg_size = (logo.size[0] + pad * 2, logo.size[1] + pad * 2)
    bg = Image.new("RGBA", bg_size, SAGE_SOFT + (255,))
    bg_mask = Image.new("L", bg_size, 0)
    ImageDraw.Draw(bg_mask).rounded_rectangle(
        [0, 0, bg_size[0], bg_size[1]],
        radius=int(min(bg_size) * 0.5),
        fill=255,
    )

    right_margin = 60
    bg_pos = (WIDTH - right_margin - bg_size[0], (HEIGHT - bg_size[1]) // 2)
    canvas.paste(bg, bg_pos, bg_mask)

    logo_pos = (bg_pos[0] + pad, bg_pos[1] + pad)
    canvas.paste(logo, logo_pos, mask)


def draw_text_block(canvas: Image.Image) -> None:
    draw = ImageDraw.Draw(canvas)

    eyebrow_font = load_font(SCRIPT, 36)
    title_font = load_font(SERIF_BOLD, 78)
    sub_font = load_font(SERIF_ITALIC, 48)
    tagline_font = load_font(SANS, 26, index=2)
    areas_font = load_font(SANS, 20, index=0)
    url_font = load_font(SANS, 24, index=4)

    x = 70

    draw.text((x, 110), "in and around the Dee Valley", font=eyebrow_font, fill=APRICOT)

    draw.text((x, 175), BRAND_NAME, font=title_font, fill=CREAM)

    draw.text((x, 275), BRAND_SUB, font=sub_font, fill=CREAM_DIM)

    draw.text((x, 365), TAGLINE, font=tagline_font, fill=CREAM)

    draw.text((x, 410), AREAS, font=areas_font, fill=CREAM_DIM)

    dot_y = 510
    draw.ellipse([x, dot_y, x + 10, dot_y + 10], fill=APRICOT)
    draw.text((x + 24, dot_y - 12), URL, font=url_font, fill=CREAM)


def build_app_icon(size: int) -> Image.Image:
    canvas = Image.new("RGB", (size, size), SAGE_DEEP)
    logo = Image.open(LOGO).convert("RGBA")

    pad = int(size * 0.10)
    inner = size - pad * 2
    ratio = inner / max(logo.size)
    w = int(logo.width * ratio)
    h = int(logo.height * ratio)
    logo = logo.resize((w, h), Image.LANCZOS)

    canvas.paste(logo, ((size - w) // 2, (size - h) // 2), logo)
    return canvas


def write_icons() -> None:
    apple = ROOT / "public" / "apple-touch-icon.png"
    icon192 = ROOT / "public" / "icon-192.png"
    icon512 = ROOT / "public" / "icon-512.png"

    build_app_icon(180).save(apple, "PNG", optimize=True)
    build_app_icon(192).save(icon192, "PNG", optimize=True)
    build_app_icon(512).save(icon512, "PNG", optimize=True)

    for path in (apple, icon192, icon512):
        print(f"wrote {path.name}  ({path.stat().st_size // 1024} KB)")


def main() -> None:
    canvas = make_background()
    paste_logo(canvas)
    draw_text_block(canvas)
    draw_decorative_frame(ImageDraw.Draw(canvas))
    canvas.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT.name}  ({OUT.stat().st_size // 1024} KB)")
    write_icons()


if __name__ == "__main__":
    main()
