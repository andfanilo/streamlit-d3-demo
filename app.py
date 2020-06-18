import random

import streamlit as st

from streamlit_d3_demo import d3


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
d3(data, circle_radius, circle_color, key="d3")
