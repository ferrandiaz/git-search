'use strict';

module.exports.parseUser = ({login, id, html_url, repos_url}) => ({
  user: login,
  user_id: id,
  user_url: html_url,
  repos_url
});
