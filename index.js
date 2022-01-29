const core = require('@actions/core');
const github = require('@actions/github');
const { Nogi, GithubApi, NotionApi } = require('nogi');

(async () => {
    try {
        const pageSync = new Nogi(
            new GithubApi(
                core.getInput('github-access-token'),
                core.getInput('repo-owner'),
                core.getInput('repo'),
                core.getInput('branch')
            ),
            new NotionApi(core.getInput('notion-integration-key'))
        );

        await pageSync.sync(core.getInput('docs-path'));
    } catch (e) {
        core.setFailed(e.message);
    }
})();
