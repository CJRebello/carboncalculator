/**
 * This class Calculates the emissions a human emits per year from various sources.
 * @author Colin Rebello
 * @version 5/5/2023
 * 
 * Data sourced from:
 * https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle#:~:text=typical%20passenger%20vehicle%3F-,A%20typical%20passenger%20vehicle%20emits%20about%204.6%20metric%20tons%20of,8%2C887%20grams%20of%20CO2.
 */

class Calculator {
  static AVERAGE_HUMAN_TOTAL_EMISSIONS = 5.1; //metric tons/yr.
  static AVERAGE_CAR_TOTAL_EMISSIONS = 4.65; //metric tons/yr.
  static AVERAGE_GALLON_GAS_CO2 = 0.008887; //metric tons co2.
  static CO2_PER_GALLON_JETFUEL = 0.01192404717; //metric tons co2

  static totalEmissions;
  static totalPercentageAverage;

  static carEmissions;
  static carPercentageAverage;

  static transitEmissions;
  static flightEmissions;

  /**
   * Calculate Emissions
   * @param milesPerYear miles driven by car per year
   * @param milesPerGallon miles per gallon of car
   * @param milesPublicTransit miles traveled by train or bus.
   * @param milesFlights miles flown by plane
   */
  static Calculate(milesPerYear, milesPerGallon, milesPublicTransit, milesFlights) {
    this.totalEmissions = 0.0;
    //CAR EMISSIONS
    this.carEmissions = (milesPerYear / milesPerGallon) * this.AVERAGE_GALLON_GAS_CO2;

    //Percentage higher or lower than avg
    if (this.carEmissions > this.AVERAGE_CAR_TOTAL_EMISSIONS) {

      let percent = ((1 - this.AVERAGE_CAR_TOTAL_EMISSIONS / this.carEmissions) * 100);
      this.carPercentageAverage = `Your car emissions are ${percent.toFixed(2)}% over the average\n`;

    } else {

      let percent = ((1 - this.carEmissions / this.AVERAGE_CAR_TOTAL_EMISSIONS) * 100);
      this.carPercentageAverage = `Your car emissions are ${percent.toFixed(2)}% below the average\n`;

    }

    //FLIGHT EMISSIONS
    //A plane averages 10-30 miles per gallon.
    this.flightEmissions = (milesFlights / 10) * this.CO2_PER_GALLON_JETFUEL;

    //TRANSPORATION EMISSIONS
    //
    this.transitEmissions = (milesPublicTransit / 2 / 8) * this.AVERAGE_GALLON_GAS_CO2 + (milesPublicTransit / 2 / 500);

    //TOTAL EMISSIONS
    this.totalEmissions = this.carEmissions + this.flightEmissions + this.transitEmissions;

    //Percentage higher or lower than avg
    if (this.totalEmissions > this.AVERAGE_HUMAN_TOTAL_EMISSIONS) {

      let percent = ((1 - this.AVERAGE_HUMAN_TOTAL_EMISSIONS / this.totalEmissions) * 100);
      this.totalPercentageAverage = `Your total emissions are ${percent.toFixed(2)}% over the average\n`;

    } else {

      let percent = ((1 - this.totalEmissions / this.AVERAGE_HUMAN_TOTAL_EMISSIONS) * 100);
      this.totalPercentageAverage = `Your total emissions are ${percent.toFixed(2)}% below the average\n`;

    }
  }
}

console.log("Enter mpy, mpg, pt, mf");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
    const [mpy, mpg, pt, mf] = input.split(" ");
    const numerator = mpy * mpg * pt;
    const denominator = mf * 1000;
    const result = numerator / denominator;
    console.log('The result is: ${result}');
  });