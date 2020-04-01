const core = require('@actions/core')
const axios = require('axios')

const expectedStatuses = [200]

const DEFAULT_TIMEOUT = '900000' // 15 minutes

const parseTimeout = s => {
  const parsed = parseInt(s, 10)
  if (isNaN(parsed)) { return 0 }
  return parsed
}

try {
  const site = core.getInput('site') || 'acm'
  const branch = core.getInput('branch')
  const environ = core.getInput('environ')
  const command = core.getInput('command')
  const timeout = core.getInput('timeout') || DEFAULT_TIMEOUT
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
    },
    timeout: parseTimeout(timeout)
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
