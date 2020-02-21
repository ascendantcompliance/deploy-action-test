const core = require('@actions/core')
const axios = require('axios')

const expectedStatuses = [200]

try {
  const site = core.getInput('site') || 'acm'
  const branch = core.getInput('branch')
  const environ = core.getInput('environ')
  const command = core.getInput('command')
  const token = core.getInput('token')
  const baseUrl = core.getInput('url')

  axios({
    method: 'post',
    url: `${baseUrl}/hubot/${command}`,
    headers: { 'hubot-http-token': token, 'content-type': 'application/json' },
    data: {
      site,
      branch,
      environ
    }
  })
    .then(resp => {
      if (!expectedStatuses.includes(resp.status)) {
        core.setFailed(`${command} failed with return code: ${resp.status}`)
      } else {
        core.setOutput('status', resp.status.toString())
        console.log(resp.data)
      }
    })
    .catch(err => {
      core.setFailed(`Err caught: ${err.message}`)
    })
} catch (error) {
  core.setFailed(`Error caught: ${error.message}`)
}
