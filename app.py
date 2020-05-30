import streamlit as st

d3 = st.declare_component(url="http://localhost:3001")

st.register_component("d3", d3)

st.d3()
