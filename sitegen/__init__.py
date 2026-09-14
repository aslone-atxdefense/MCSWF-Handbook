"""Static-site build for the MCSWF handbook.

    python3 build-site.py        # build dist/ from mcswf-site.html

Modules:
    config    paths, description, robots settings
    template  fragment splitting and HTML document assembly
    assets    copying static files into dist/
    build     orchestration
"""

from .build import build
from .template import FragmentError

__all__ = ["build", "FragmentError"]
