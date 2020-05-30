import random
from typing import Dict

import streamlit as st

d3 = st.declare_component(url="http://localhost:3001")


@d3
def wrapper(f, d: Dict, height: int = 400, width: int = 600, key=None):
    return f(data=d, height=height, width=width, key=key, default=None)


st.register_component("d3", d3)

data = list(zip(range(10), random.sample(range(10), 10)))

st.title("Hello D3 in Streamlit")
st.d3(data, key="d3")
