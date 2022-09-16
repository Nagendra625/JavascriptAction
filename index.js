const core = require('@actions/core');
const github = require('@actions/github');
const XMLHttpRequest = require('xhr2');
try {

    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);

    const organizationId = core.getInput('organizationId');
    const projectId = core.getInput('projectId');
    const testplanid = core.getInput('testplanid');
    const testsuiteid = core.getInput('testsuiteid');
    const patToken = core.getInput('PAT_TOKEN')

    var request = new XMLHttpRequest()

    request.open('GET', `https://dev.azure.com/${organizationId}/${projectId}/_apis/test/Plans/${testplanid}/Suites/${testsuiteid}/points?api-version=6.0`, true)
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8;');
    request.setRequestHeader("Authorization", "Basic " + btoa('Basic' + ":" + patToken));

    request.onload = function () {
        // Begin accessing JSON data here

        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            console.log(data)
        } else {
            console.log('error')
        }
    }

    request.send()

} catch (error) {
    core.setFailed(error.message);
}