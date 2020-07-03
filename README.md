# D3 Demo in Streamlit

An example project for a custom D3 chart _with React hooks_ into Streamlit. 

* Dynamic line chart
* Overlapping scatter plot, with customizable size/color
* Interactive tooltip
* TODO : Select a circle and return it's value
* TODO : Zoom/Pan ?

Feel free to fork this project as a starter for your own D3 components.

![](./images/demo.gif)

## Install

```shell script
pip install -i https://test.pypi.org/simple/ streamlit-d3-demo
```

## Example Usage

```python
import random
from streamlit_d3_demo import d3_line

def generate_random_data(x_r, y_r):
    return list(zip(range(x_r), [random.randint(0, y_r) for _ in range(x_r)]))

d3_line(generate_random_data(20, 500), circle_radius=15, circle_color="#6495ed")
```

## Development 

### Install

* JS side

```shell script
cd frontend
npm install
```

* Python side 

```shell script
conda create -n streamlit-d3 python=3.7
conda activate streamlit-d3
pip install -e .
```

### Run

Both JS and Python should run at the same time.

* JS side

```shell script
cd frontend
npm run start
```

* Python side

```shell script
streamlit run app.py
```

## References

D3 :
* https://observablehq.com/@d3/learn-d3
* https://observablehq.com/@d3/margin-convention
* https://wattenberger.com/blog/d3
* https://wattenberger.com/blog/d3-interactive-charts
* https://spin.atomicobject.com/2017/07/20/d3-react-typescript/
* https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2

React :
* https://kentcdodds.com/blog/usememo-and-usecallback
* https://overreacted.io/a-complete-guide-to-useeffect/

D3 + React hooks :
* https://wattenberger.com/blog/react-and-d3
* https://medium.com/@jeffbutsch/using-d3-in-react-with-hooks-4a6c61f1d102
* https://www.youtube.com/playlist?list=PLDZ4p-ENjbiPo4WH7KdHjh_EMI7Ic8b2B
* https://observablehq.com/@herrstucki/react-hooks-and-d3
* https://clhenrick.io/animating-svg-d3-react-hooks/
* https://medium.com/@stopyransky/react-hooks-and-d3-39be1d900fb
* https://swizec.com/blog/easy-d3-blackbox-components-react-hooks/swizec/8689
* https://dev.to/benjaminadk/basketball-stats-through-d3-react-4m10
* https://medium.com/stationfive/how-to-create-a-pie-chart-with-d3-js-and-react-hooks-part-1-81bcd7f39b32

D3 + React class component :
* https://hackernoon.com/how-and-why-to-use-d3-with-react-d239eb1ea274/
* https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/
* https://gist.github.com/alexcjohnson/a4b714eee8afd2123ee00cb5b3278a5f
* https://blog.logrocket.com/data-visualization-in-react-using-react-d3-c35835af16d0/
* https://www.freecodecamp.org/news/how-to-get-started-with-d3-and-react-c7da74a5bd9f/
* https://grafana.com/tutorials/build-a-panel-plugin-with-d3/#6
* https://stackoverflow.com/questions/49611148/how-to-add-tooltip-in-react-d3-v4-bar-chart
* https://stackoverflow.com/questions/38116805/react-js-d3-charts-tooltip/56674517#56674517
