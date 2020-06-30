import random
from typing import List
from typing import Tuple

import streamlit as st

from streamlit_d3_demo import d3_line


@st.cache
def generate_random_data(x_range: int, y_range: int) -> List[Tuple[int, int]]:
    return list(zip(range(x_range), [random.randint(0, y_range) for _ in range(y_range)]))


st.sidebar.subheader("Configuration")
st_x_range = st.sidebar.slider("X range", 10, 100, 20)
st_y_range = st.sidebar.slider("Y range", 10, 1000, 500)
circle_radius = st.sidebar.slider("Circle radius", 1, 25, 15)
circle_color = st.sidebar.beta_color_picker("Circle color", "#6495ed")
data = generate_random_data(st_x_range, st_y_range)

st.title("Hello D3 in Streamlit")
d3_line(data, circle_radius, circle_color, key="d3")
