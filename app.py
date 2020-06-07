import random
from typing import Dict

import streamlit as st

# d3 = st.declare_component(url="http://localhost:3001")  # for development, run `npm run start` beforehand
d3 = st.declare_component(path="frontend/build")  # for production, run `npm run build` beforehand


@st.cache
def generate_random_data(x_r, y_r):
    return list(zip(range(x_r), [random.randint(0, y_r) for _ in range(x_r)]))


@d3
def wrapper(
    f,
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
    return f(
        data=d,
        svgHeight=height,
        svgWidth=width,
        circleRadius=c_radius,
        circleColor=c_color,
        margin=margin,
        key=key,
        default=None,
    )


st.register_component("d3", d3)

st.sidebar.subheader("Configuration")
x_range = st.sidebar.slider("X range", 10, 100, 20)
y_range = st.sidebar.slider("Y range", 10, 1000, 500)
circle_radius = st.sidebar.slider("Circle radius", 1, 25, 15)
circle_color = st.sidebar.beta_color_picker("Circle color", "#6495ed")
data = generate_random_data(x_range, y_range)

st.title("Hello D3 in Streamlit")
st.d3(data, circle_radius, circle_color, key="d3")
