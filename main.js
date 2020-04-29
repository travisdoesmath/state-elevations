var global = {
    selectedStates: ['Colorado','Kansas'],
    stateListener: function(val) {},
    set state(val) {
        this.selectedStates.indexOf(val) === -1 ? this.selectedStates.push(val) : this.selectedStates = this.selectedStates.filter(d => d !== val);
        this.stateListener(val);
    },
    registerListener: function(listener) {
        this.stateListener = listener;
    }
};

var files = [
    {'location':'./elevations.csv', protocol:d3.csv},
    {'location':'./states.json', protocol:d3.json},
    ],
    promises = [];

files.forEach(file => promises.push(file.protocol(file.location)))

stateRegions = {
    'Montana': 'West', 
    'Idaho': 'West', 
    'Wyoming': 'West', 
    'Colorado': 'West', 
    'New Mexico': 'West', 
    'Arizona': 'West', 
    'Utah': 'West', 
    'Nevada': 'West', 
    'California': 'West', 
    'Oregon': 'West', 
    'Washington': 'West', 

    'Delaware': 'South', 
    'Maryland': 'South', 
    'Virginia': 'South', 
    'West Virginia': 'South', 
    'Kentucky': 'South', 
    'North Carolina': 'South', 
    'South Carolina': 'South', 
    'Tennessee': 'South', 
    'Georgia': 'South', 
    'Florida': 'South', 
    'Alabama': 'South', 
    'Mississippi': 'South', 
    'Arkansas': 'South', 
    'Louisiana': 'South', 
    'Texas': 'South',
    'Oklahoma': 'South',

    'Ohio': 'Midwest',
    'Michigan': 'Midwest',
    'Indiana': 'Midwest', 
    'Wisconsin': 'Midwest', 
    'Illinois': 'Midwest', 
    'Minnesota': 'Midwest', 
    'Iowa': 'Midwest', 
    'Missouri': 'Midwest', 
    'North Dakota': 'Midwest', 
    'South Dakota': 'Midwest', 
    'Nebraska': 'Midwest', 
    'Kansas': 'Midwest',

    'Maine':'Northeast', 
    'New Hampshire':'Northeast', 
    'Vermont':'Northeast', 
    'Massachusetts':'Northeast', 
    'Rhode Island':'Northeast', 
    'Connecticut':'Northeast', 
    'New York':'Northeast', 
    'New Jersey':'Northeast', 
    'Pennsylvania':'Northeast'
}

regionColor = {
    West: {high:'#f0c30e', low:'#c78800'},
    South: {high:'#00e800', low:'#36b536'},
    Midwest: {high:'#42b6f5', low:'#007ec2'},
    Northeast: {high:'#b62fc2', low:'#a317b0'}
}

stateColor = {
    'Colorado': d3.interpolate(d3.color(regionColor.West.high), d3.color(regionColor.West.low))(0/10), 
    'California': d3.interpolate(d3.color(regionColor.West.high), d3.color(regionColor.West.low))(1/10), 
    'Washington': d3.interpolate(d3.color(regionColor.West.high), d3.color(regionColor.West.low))(2/10),
    'New Mexico': d3.interpolate(d3.color(regionColor.West.high), d3.color(regionColor.West.low))(3/10),
    'Nevada': d3.interpolate(d3.color(regionColor.West.high), d3.color(regionColor.West.low))(4/10),
    'Oregon': d3.interpolate(d3.color(regionColor.West.high), d3.color(regionColor.West.low))(5/10),
    'Arizona': d3.interpolate(d3.color(regionColor.West.high), d3.color(regionColor.West.low))(6/10),
    'Wyoming': d3.interpolate(d3.color(regionColor.West.high), d3.color(regionColor.West.low))(7/10), 
    'Idaho': d3.interpolate(d3.color(regionColor.West.high), d3.color(regionColor.West.low))(8/10), 
    'Montana': d3.interpolate(d3.color(regionColor.West.high), d3.color(regionColor.West.low))(9/10), 
    'Utah': d3.interpolate(d3.color(regionColor.West.high), d3.color(regionColor.West.low))(10/10), 

    'Texas': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(0/15),
    'North Carolina': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(1/15), 
    'West Virginia': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(2/15), 
    'Arkansas': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(3/15), 
    'Virginia': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(4/15), 
    'South Carolina': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(5/15), 
    'Oklahoma': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(6/15),
    'Mississippi': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(7/15), 
    'Tennessee': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(8/15), 
    'Louisiana': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(9/15), 
    'Alabama': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(10/15), 
    'Kentucky': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(11/15), 
    'Maryland': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(12/15), 
    'Florida': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(13/15), 
    'Delaware': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(14/15), 
    'Georgia': d3.interpolate(d3.color(regionColor.South.high), d3.color(regionColor.South.low))(15/15), 

    'Kansas': d3.interpolate(d3.color(regionColor.Midwest.high), d3.color(regionColor.Midwest.low))(0/11),
    'North Dakota': d3.interpolate(d3.color(regionColor.Midwest.high), d3.color(regionColor.Midwest.low))(1/11), 
    'Wisconsin': d3.interpolate(d3.color(regionColor.Midwest.high), d3.color(regionColor.Midwest.low))(2/11), 
    'Nebraska': d3.interpolate(d3.color(regionColor.Midwest.high), d3.color(regionColor.Midwest.low))(3/11), 
    'Michigan': d3.interpolate(d3.color(regionColor.Midwest.high), d3.color(regionColor.Midwest.low))(4/11),
    'Indiana': d3.interpolate(d3.color(regionColor.Midwest.high), d3.color(regionColor.Midwest.low))(5/11), 
    'Missouri': d3.interpolate(d3.color(regionColor.Midwest.high), d3.color(regionColor.Midwest.low))(6/11), 
    'Iowa': d3.interpolate(d3.color(regionColor.Midwest.high), d3.color(regionColor.Midwest.low))(7/11), 
    'Illinois': d3.interpolate(d3.color(regionColor.Midwest.high), d3.color(regionColor.Midwest.low))(8/11), 
    'Minnesota': d3.interpolate(d3.color(regionColor.Midwest.high), d3.color(regionColor.Midwest.low))(9/11), 
    'Ohio': d3.interpolate(d3.color(regionColor.Midwest.high), d3.color(regionColor.Midwest.low))(10/11), 
    'South Dakota': d3.interpolate(d3.color(regionColor.Midwest.high), d3.color(regionColor.Midwest.low))(11/11), 

    'Vermont': d3.interpolate(d3.color(regionColor.Northeast.high), d3.color(regionColor.Northeast.low))(0/8),
    'Pennsylvania': d3.interpolate(d3.color(regionColor.Northeast.high), d3.color(regionColor.Northeast.low))(1/8),
    'Maine': d3.interpolate(d3.color(regionColor.Northeast.high), d3.color(regionColor.Northeast.low))(2/8),
    'Rhode Island': d3.interpolate(d3.color(regionColor.Northeast.high), d3.color(regionColor.Northeast.low))(3/8),
    'Massachusetts': d3.interpolate(d3.color(regionColor.Northeast.high), d3.color(regionColor.Northeast.low))(4/8),
    'New York': d3.interpolate(d3.color(regionColor.Northeast.high), d3.color(regionColor.Northeast.low))(5/8),
    'Connecticut': d3.interpolate(d3.color(regionColor.Northeast.high), d3.color(regionColor.Northeast.low))(6/8),
    'New Hampshire': d3.interpolate(d3.color(regionColor.Northeast.high), d3.color(regionColor.Northeast.low))(7/8),
    'New Jersey': d3.interpolate(d3.color(regionColor.Northeast.high), d3.color(regionColor.Northeast.low))(8/8),
}

function color(state) {
    // return regionColor[stateRegions[state]];
    return stateColor[state];
}

Promise.all(promises).then(function(values) {
    data = values[0];
    us = values[1]
    us.features = us.features.filter(d => Object.keys(stateRegions).indexOf(d.properties.name) !== -1)


    data = data.reduce(function(obj, d) {
        if (!obj.hasOwnProperty(d.state)) {
            obj[d.state] = [];
        }
        
        obj[d.state].push(d);
        
        return obj;
    }, {})

    data = Object.keys(data).map(s => { return {state:s, data:data[s]}; })

    data.forEach(d => d.data.forEach((dd, i) => dd.i = i))

    chart = new LineChart({
        element: document.querySelector('.chart-container'),
        data: data,
        selected: global.selectedStates,
        color: color,
        x: d => d.i,
        y: d => d.mean,
        y0: d => d.min,
        y1: d => d.max
    })

    map = new Map({
        element: document.querySelector('.map-container'),
        geoJson: us,
        selected: global.selectedStates,
        color: color
    })

    global.registerListener(function(val) {
        chart.selected = this.selectedStates;
        map.selected = this.selectedStates;
        chart.draw();
        map.draw();

    })
});

