import random
from typing import Dict

import streamlit as st

d3 = st.declare_component(url="http://localhost:3001")


@d3
def wrapper(f, d: Dict, height: int = 400, width: int = 600, margin: Dict = None, key=None):
    if margin is None:
        margin = {'top': 20, 'bottom': 30, 'left': 40, 'right': 30}
    return f(data=d, svgHeight=height, svgWidth=width, margin=margin, key=key, default=None)


st.register_component("d3", d3)

x_range = 20
y_range = 500
data = list(zip(range(x_range), [random.randint(0, y_range) for x in range(x_range)]))

st.title("Hello D3 in Streamlit")
st.d3(data, key="d3")
