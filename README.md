# Stacked Bar Chart and Legend
### A reusable UI component for the Junior Web Developer progression target 2c

## Information
This component assumes a connection to qlik enterprise and to a qlik object that has at least 2 dimensions and 1 measure.

The stacked bar chart "group" is what each entire bar represents (i.e. the values on the axis where the bars extend from) and the "subgroup" is what each individual section of the bars represents (i.e. the values in the legend).

## Configuration:
The config.js file is intended for the user to alter so that the component may be reusable.
The configuration sets the qlik connection information and the necessary details of the chart component.

In the `connectionConfig` the qlik host name, app ID and object ID can be set.

The details of the `chartConfig` are explained below:

* `dataIndexes` are the indexes of the group, subgroup and value columns within the qlik table. E.g. if the group dimension is the first column in the qlik table then the group index would be 0.
* `dimensionNames` are the dimension field names in qlik that the user would to use as the group and subgroup.
* `colorOrder` is the order of colours that will represent each subgroup.
* `tableHeaders` is the column titles for the legend in order from left to right.
