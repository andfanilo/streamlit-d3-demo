import os
from typing import Dict
from typing import List
from typing import Tuple

import streamlit.components.v1 as components

_RELEASE = False  # on packaging, pass this to True

if not _RELEASE:
    _component_func = components.declare_component("d3_demo", url="http://localhost:3001",)
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("d3_demo", path=build_dir)


def d3_line(
    data: List[Tuple[int, int]],
    circle_radius: int = 15,
    circle_color: str = "#6495ed",
    height: int = 400,
    width: int = 600,
    margin: Dict = None,
    key=None,
):
    """Display a line chart with overlapping circles on a list of (x, y) points, using the D3 library.

    :param data: A list of (x, y) points
    :param circle_radius:  Radius of overlapping circles, in pixels
    :param circle_color:  Color of overlapping circles, as a CSS color or hexadecimal value.
    :param height:  Height of canvas, in pixels
    :param width:  Width of canvas, in pixels
    :param margin:  Margins surronding the plot inside the canvas, expects "top", "bottom", "left" and "right" keys
    :param key:  An optional string to use as the unique key for the widget.
    """
    if margin is None:
        margin = {"top": 20, "bottom": 30, "left": 40, "right": 30}

    component_value = _component_func(
        data=data,
        svgHeight=height,
        svgWidth=width,
        circleRadius=circle_radius,
        circleColor=circle_color,
        margin=margin,
        key=key,
        default=None,
    )
    return component_value
