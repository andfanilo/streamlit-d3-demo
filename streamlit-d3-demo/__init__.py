import os
import random
from typing import Dict

import streamlit as st

_RELEASE = False

if not _RELEASE:
    _component_func = st.declare_component("d3_demo", url="http://localhost:3001",)
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = st.declare_component("d3_demo", path=build_dir)


def d3_demo(
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


if not _RELEASE:

    @st.cache
    def generate_random_data(x_r, y_r):
        return list(zip(range(x_r), [random.randint(0, y_r) for _ in range(x_r)]))

    st.sidebar.subheader("Configuration")
    x_range = st.sidebar.slider("X range", 10, 100, 20)
    y_range = st.sidebar.slider("Y range", 10, 1000, 500)
    circle_radius = st.sidebar.slider("Circle radius", 1, 25, 15)
    circle_color = st.sidebar.beta_color_picker("Circle color", "#6495ed")
    data = generate_random_data(x_range, y_range)

    st.title("Hello D3 in Streamlit")
    d3_demo(data, circle_radius, circle_color, key="d3")
