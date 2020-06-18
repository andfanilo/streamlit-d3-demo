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
    d: Dict,
    c_radius: int = 15,
    c_color: str = "#6495ed",
    height: int = 400,
    width: int = 600,
    margin: Dict = None,
    key=None,
):
    if margin is None:
        margin = {"top": 20, "bottom": 30, "left": 40, "right": 30}

    component_value = _component_func(
        data=d,
        svgHeight=height,
        svgWidth=width,
        circleRadius=c_radius,
        circleColor=c_color,
        margin=margin,
        key=key,
        default=None,
    )
    return component_value
