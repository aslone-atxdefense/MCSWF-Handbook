"""Static files that are copied into dist/ rather than generated."""

import shutil


def copy_assets(assets, dist):
    """Copy each asset into dist/, preserving its filename. Returns the copies."""
    copied = []
    for asset in assets:
        if not asset.exists():
            raise FileNotFoundError(f"asset not found: {asset}")
        target = dist / asset.name
        shutil.copy2(asset, target)
        copied.append(target)
    return copied


def write_robots(dist, contents):
    """Write robots.txt into dist/. Returns the path written."""
    target = dist / "robots.txt"
    target.write_text(contents, encoding="utf-8")
    return target
