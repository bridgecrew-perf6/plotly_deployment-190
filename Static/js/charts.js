function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1, Step 1. Create the buildCharts function.
function buildCharts(sample) {
  // Deliverable 1, Step 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // Deliverable 1, Step 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    console.log(samples);

    // Deliverable 1, Step 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    // Delivierable 3, Step 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = meta.metadata;

      // Create a variable that holds the first sample in the array.
    var metadataResultArray = metadata.filter(sampleObj => sampleObj.id ==sample);

    // Deliverable 1, Step 5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    console.log(result);

    // Delivierable 3, Step 2. Create a variable that holds the first sample in the metadata array.
    var metadataResult = metadataResultArray[0];

    // Deliverable 1, Step 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    // otu_ids
    var otu_ids = result.otu_ids
    console.log(otu_ids)

    // otu_labels
    var otu_labels = result.otu_labels
    console.log(otu_labels)

    // sample_values
    var sample_values = result.sample_values
    console.log(sample_values)

    // Delivierable 3, Step 3. Create a variable that holds the washing frequency.
    var washFreq = parseFloat(metadataResult.wfreq);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    console.log(yticks);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"

    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // Deliverable 2: The Bubble Chart

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'Earth',
        }
      }
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: `Bacteria Cultures Per Sample ${sample}`,
      showlegend: false,
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Bacteria Count"},
      // height: 600,
      // width: 600
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Start of Gauge
    // Delivierable 3, Step 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
    
    // Delivierable 3, Step 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     
    };

    // Delivierable 3, Step 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot();
  });

  // samples.json no longer available

}
