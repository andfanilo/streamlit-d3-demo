import setuptools

setuptools.setup(
    name="streamlit-d3-demo",
    version="0.1.0",
    author="Fanilo ANDRIANASOLO",
    author_email="andfanilo@gmail.com",
    description="Testing D3 in React hooks in Streamlit",
    long_description="",
    long_description_content_type="text/plain",
    url="https://github.com/andfanilo/streamlit-d3-demo",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.6",
    install_requires=[
        "streamlit >= 0.63",
    ],
)
