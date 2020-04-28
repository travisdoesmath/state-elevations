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
    'Alaska': 'West',
    'Hawaii': 'West',

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
    'New Jersey,':'Northeast', 
    'Pennsylvania':'Northeast'
}

regionColor = {
    'West':'#ffa600',
    'South': '#7a5195',
    'Midwest': '#ef5675',
    'Northeast': '#58508d'
}

function color(d) {
    return regionColor[stateRegions[d.state]];
}

Promise.all(promises).then(function(values) {
    console.log(values);

    data = values[0];
    us = values[1]
    us.features = us.features.filter(d => ['Alaska', 'Hawaii'].indexOf(d.properties.name) === -1)


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
        // data: data.filter(d => d.state == 'Kansas'),
        data: data,
        selected: global.selectedStates,
        color: color,
        x: d => d.i,
        y: d => d.mean
    })

    map = new Map({
        element: document.querySelector('.map-container'),
        geoJson: us,
        selected: global.selectedStates
    })

    global.registerListener(function(val) {
        chart.selected = this.selectedStates;
        map.selected = this.selectedStates;
        chart.draw();
        map.draw();

    })
});

