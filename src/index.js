var fortune=require('fortune-teller');

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * UnixFortune is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var UnixFortune = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
UnixFortune.prototype = Object.create(AlexaSkill.prototype);
UnixFortune.prototype.constructor = UnixFortune;

UnixFortune.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("UnixFortune onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

UnixFortune.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("UnixFortune onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    response.tell(fortune.fortune());
};

UnixFortune.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("UnixFortune onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

UnixFortune.prototype.intentHandlers = {
    // register custom intent handlers
    "UnixFortuneIntent": function (intent, session, response) {
        var fortuneCookie=fortune.fortune();
        response.tellWithCard(fortuneCookie, "Unix Fortune", fortuneCookie);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.tell("I find and read random UNIX fortune cookies to you. Enjoy!")
    }
};


// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the UnixFortune skill.
    console.log(JSON.stringify(event));
    var f = new UnixFortune();
    f.execute(event, context);
};

