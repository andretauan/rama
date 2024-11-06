var arbitraryValuesSlider = document.getElementById('slide-doacao');
var arbitraryValuesForSlider = [
    '$10.00', '$20.00', '$30.00', '$50.00', '$100.00',
    '$150.00', '$200.00', '$250.00', '$300.00'
];

var format = {
    to: function(value) {
        return arbitraryValuesForSlider[Math.round(value)];
    },
    from: function (value) {
        return arbitraryValuesForSlider.indexOf(value);
    }
};

noUiSlider.create(arbitraryValuesSlider, {
    // start values are parsed by 'format'
    start: '$50.00',
    range: { min: 0, max: arbitraryValuesForSlider.length - 1 },
    step: 1,
    tooltips: true,
    format: format,
    pips: { mode: 'steps', format: format, density: 50 },
});

arbitraryValuesSlider.noUiSlider.on("update", function (values, handle) {
    
    $('#valor-doar').val(values[handle]);
    
});