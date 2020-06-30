import os
from typing import Dict

import streamlit as st

_RELEASE = False  # on packaging, pass this to True

if not _RELEASE:
    _component_func = st.declare_component("d3", url="http://localhost:3001",)
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = st.declare_component("d3", path=build_dir)


def d3(
    data: Dict,
    circle_radius: int = 15,
    circle_color: str = "#6495ed",
    height: int = 400,
    width: int = 600,
    margin: Dict = None,
    key=None,
):
    """Display data using the D3 library.

    TODO: add docstrings for parameters and return value
     (Also, it looks like the "data" param does not actually need to be a dict?
     In the example, it's being passed a list.)

    :param data:
    :param circle_radius:
    :param circle_color:
    :param height:
    :param width:
    :param margin:
    :param key:
    :return:
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
