import React from 'react';
import ReactDOM from 'react-dom';

import { Calendar, CalendarCell, CalendarWeekCell, CalendarNavigationItem, CalendarHeaderTitle, DateInput, DatePicker, TimePicker, MultiViewCalendar, DateRangePicker, DateTimePicker } from '@progress/kendo-react-dateinputs'
import { MaskedTextBox, NumericTextBox, Input, Switch, Slider, SliderLabel } from '@progress/kendo-react-inputs'
import '@progress/kendo-react-intl'
import '@progress/kendo-react-tooltip'
import '@progress/kendo-react-common'
import '@progress/kendo-react-popup'
import '@progress/kendo-date-math'
import '@progress/kendo-react-dropdowns'
import { filterBy } from '@progress/kendo-data-query';
import { MultiSelect,AutoComplete } from '@progress/kendo-react-dropdowns';

const sports = [ "Prellball", "Basketball", "Fussball", "Völkerball", "Faustball", "Handball", "Korbball", "Volleyball" ];

const laenderMitA = [ "Afghanistan", "Ägypten", "Albanien", "Algerien", "Andorra", "Angola", "Antarktis", "Antigua und Barbuda", "Äquatorialguinea", "Argentinien", "Armenien", "Aserbaidschan", "Äthiopien", "Australien" ];


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiSelectValue: [],
            autoCompleteData: laenderMitA,
            autoCompleteValue: '',
            value: 5,
            percentage: 0.7,
            formatOptions: {
                style: 'currency',
                currency: 'EUR',
                currencyDisplay: 'name'
            }
        };
    }

    filterData(value) {
        const data = laenderMitA;
        const filter = {
            value: value,
            operator: 'startswith',
            ignoreCase: true
        };
        return value ? filterBy(data, filter) : data;
    }

    onAutoCompleteChange = (event) => {
        const value = event.target.value;

        this.setState({
            autoCompleteData: this.filterData(value),
            autoCompleteValue: value
        });
    }

    onMultiSelectChange = (event) => {
        this.setState({
            multiSelectValue: [ ...event.target.value ]
        });
    }


    defaultValue = new Date(2019, 6, 18, 12, 0, 0);
    min = new Date(2018, 8, 1);
    max = new Date(2018, 9, 25);

    render() {
        return (
            <div className="example-wrapper" style={{ minHeight: '400px' }}>
                <h4>Hinweis: 
                Diese Eingabefelder möchten wir für die kommenden Anwendungen verwenden. Bitte schaut sie euch an und sagt uns was ihr denkt. Es kommen noch mehr dazu. 
                Einiges hier erscheint auf Englisch (Dezimaltrenner, feste Texte wie Month). Das wird nur in dieser Demo so sein. </h4>
                <p />
                <h4>Datumsfelder</h4>
                <div className="col-xs-12 col-sm-12 example-col">
                    <p>Tag wählen (für Monat numerische eingabe und Montaskürzelausgabe):</p>
                    <DatePicker format={"dd-MMM-yyyy"} width={200}
                    />
                </div>
                <div className="col-xs-12 col-sm-12 example-col">
                    <p>Monat wählen:</p>
                    <DatePicker
                        format={"MMMM yyyy"}
                        defaultValue={this.defaultValue}
                    />
                </div>
                <div className="col-xs-12 col-sm-12 example-col">
                    <p>Quartal wählen:</p>
                    <DatePicker
                        format={"QQQ-yyyy"}
                        defaultValue={this.defaultValue}
                    />
                </div>
                <div className="col-xs-12 col-sm-12 example-col">
                    <p>Jahr wählen:</p>
                    <DatePicker
                        format={"yyyy"}
                        defaultValue={this.defaultValue}
                    />
                </div> 
                <div className="col-xs-12 col-sm-12 example-col">
                  <p>Datumeingabe ohne Maus:</p>
                    <DatePicker
                        ref={(picker) => { this.picker = picker }}
                        defaultValue={this.value}
                    />
                    <p>(use Alt+<code>↓</code> to open the calendar, <code>←</code> and <code>→</code> to navigate, <code>↑</code> to increment and <code>↓</code> to decrement the value).</p>
                </div>   
                <div>
                    <div className="example-config">
                        <p>Wähle einen Datumsbereich. Hier kann ich Mindest- und Höchstwerte definieren:</p>
                        <DateRangePicker
                            min={this.min}
                            max={this.max}
                            format={"dd-MM-yyyy"}
                            defaultValue={this.defaultValue}
                        ></DateRangePicker>
                    </div>
                </div>
                <div>
                  <h4>Numerische Eingabefelder</h4>
                  <p>Diese Felder unterstützen per default die englischen Punkt-Als-Komma Regel.  Bitte beachtet die Bezeichner die im Feld erscheine, und bei Beginn der Eingabe oberhalb des Felds sich platzieren. </p>
                  <h6>Decimal</h6>
                  <NumericTextBox
                      label="Fläche"
                      defaultValue={10000}
                      format="n2"
                  />
                  <h6>Percentage</h6>
                  <NumericTextBox
                      format="p"
                      label="Belegungsquote"
                      min={0}
                      max={1}
                      step={0.1}
                  />
                  <h6>Currency</h6>
                  <NumericTextBox
                      label="Preis"
                      format="c2"
                      min={0}
                  />
                  <h6>Currency with format options</h6>
                  <NumericTextBox
                      label="Preis mit Währung"
                      min={0}
                      format={this.state.formatOptions}
                  />
                </div>

                <p/>
                <h4>Mehrfacheingabe/Auswahl</h4>
                <div className="example-wrapper">
                        <p>Lieblingsballsport (Multiselect, wenn ich ein gewähltes Element nochmals klicke, wird das Element "un"gewählt):</p>
                        <MultiSelect
                            data={sports}
                            onChange={this.onMultiSelectChange}
                            value={this.state.multiSelectValue}
                        />
                    <p>Autocomplete basierend auf eine Listenquelle, sei mutig und gib eine A:</p>                  
                    <AutoComplete
                      data={this.state.autoCompleteData}
                      value={this.state.autoCompleteValue}
                      onChange={this.onAutoCompleteChange}
                      placeholder="e.g. Austria" />
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);

