/*
 * GitHub-Profile-Stats App
 * Description : Get github statistics in svg which can be used shown in github readme
 * Author      : KasRoudra(https://github.com/KasRoudra, https://github.com/KasRoudra2)
 * Email       : kasroudrakrd@gmail.com
 * Language    : JavaScript(Environment Runtime: NodeJS)
 * Date        : 27-3-22
 */

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const port = process.env.PORT || 5000;
const token = process.env.TOKEN;

// Credit: https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
const formatter = (num, digits = 1) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

const themes = {
  normal: {
    color: "rgb(88, 96, 105)",
    backgroundColor: "#fff",
  },
  dark: {
    color: "#ddd",
    backgroundColor: "rgb(2,0,36)",
  },
};

const successCard = (
  theme,
  name,
  starCount,
  forkCount,
  commitCount,
  changeCount,
  watchersCount,
  contRepoCount,
  pullCount,
  issueCount
) => {
  return `<svg width="360" height="260" xmlns="http://www.w3.org/2000/svg">
    <style>
    svg {
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
      font-size: 14px;
      line-height: 21px;
    }
    
    #background {
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      fill: ${theme.backgroundColor};
      stroke: rgb(225, 228, 232);
      stroke-width: 1px;
      rx: 6px;
      ry: 6px;
    }
    
    foreignObject {
      width: calc(100% - 10px - 32px);
      height: calc(100% - 10px - 32px);
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
    }
    
    th {
      padding: 0.5em;
      padding-top: 0;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      color: rgb(3, 102, 214);
    }
    
    td {
      margin-bottom: 16px;
      margin-top: 8px;
      padding: 0.25em;
      font-size: 12px;
      line-height: 18px;
      color: ${theme.color};
    }
    
    tr {
      transform: translateX(-200%);
      animation-duration: 2s;
      animation-name: slideLeft;
      animation-function: ease-in-out;
      animation-fill-mode: forwards;
    }
    tr:nth-child(even) {
        animation-name: slideRight;
    }
    .octicon {
      fill: rgb(88, 96, 105);
      margin-right: 1ch;
      vertical-align: top;
    }
    
    @keyframes slideIn {
      to {
        transform: translateX(0);
      }
    }
    
    @keyframes slideLeft {
      from {
          transform: translateX(-200%);
      }
      to {
        transform: translateX(0);
      }
    }
    
    @keyframes slideRight {
      from {
          transform: translateX(200%);
      }
      to {
        transform: translateX(0);
      }
    }
    </style>
    <g>
    <rect x="5" y="5" id="background" />
    <g>
       
    <foreignObject x="21" y="21" width="318" height="168">
    <div xmlns="http://www.w3.org/1999/xhtml">
    
    <table>
    <thead><tr style="transform: translateX(0);">
    <th colspan="2" id="name">${name}'s GitHub Statistics</th>
    </tr></thead>
    <tbody>
        
    <tr><td><svg class="octicon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>Stars</td><td id="starCount">${starCount}</td></tr>
    
    <tr style="animation-delay: 150ms"><td><svg class="octicon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>Forks</td><td id="forkCount">${forkCount}</td></tr>
    
    <tr style="animation-delay: 300ms"><td><svg class="octicon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1 2.5A2.5 2.5 0 013.5 0h8.75a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V1.5h-8a1 1 0 00-1 1v6.708A2.492 2.492 0 013.5 9h3.25a.75.75 0 010 1.5H3.5a1 1 0 100 2h5.75a.75.75 0 010 1.5H3.5A2.5 2.5 0 011 11.5v-9zm13.23 7.79a.75.75 0 001.06-1.06l-2.505-2.505a.75.75 0 00-1.06 0L9.22 9.229a.75.75 0 001.06 1.061l1.225-1.224v6.184a.75.75 0 001.5 0V9.066l1.224 1.224z"></path></svg>All-time contributions</td><td id="commitCount">${commitCount}</td></tr>
    
    <tr style="animation-delay: 450ms"><td><svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 00-1.5 0V5H4a.75.75 0 000 1.5h3.25v3.25a.75.75 0 001.5 0V6.5H12A.75.75 0 0012 5H8.75V1.75zM4 13a.75.75 0 000 1.5h8a.75.75 0 100-1.5H4z"></path></svg>Lines of code changed</td><td id="changeCount">${changeCount}</td></tr>
    
    <tr style="animation-delay: 600ms"><td><svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path></svg>Watchers</td><td id="watchersCount">${watchersCount}</td></tr>
    
    <tr style="animation-delay: 750ms"><td><svg class="octicon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16"><path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path></svg>Pull requests</td><td id="pullCount">${pullCount}</td></tr>
    
    <tr style="animation-delay: 900ms"><td><svg class="octicon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16"><path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path><path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path></svg>Issues</td><td id="issueCount">${issueCount}</td></tr>
    
    <tr style="animation-delay: 1050ms"><td><svg class="octicon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>Repositories with contributions</td><td id="contRepoCount">${contRepoCount}</td></tr>
    
    
    </tbody>
    </table>
    
    </div>
    </foreignObject>
    </g>
    </g>
    </svg>`;
};

const errorCard = (message) => {
  return `<svg width="360" height="120" xmlns="http://www.w3.org/2000/svg">
        <style>
        svg {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
          font-size: 14px;
          line-height: 21px;
        }
        
        #background {
          width: calc(100% - 10px);
          height: calc(100% - 10px);
          fill: red;
          stroke: rgb(225, 228, 232);
          stroke-width: 1px;
          rx: 6px;
          ry: 6px;
        }
        
        foreignObject {
          width: calc(100% - 10px - 32px);
          height: calc(100% - 10px - 32px);
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: auto;
        }
        
        th {
          padding: 0.5em;
          padding-top: 0;
          text-align: left;
          font-size: 14px;
          font-weight: 600;
          color: white;
        }
        
        
        
        tr {
          transform: translateX(-200%);
          animation-duration: 2s;
          animation-name: slideIn;
          animation-function: ease-in-out;
          animation-fill-mode: forwards;
        }
        
        
        
        @keyframes slideIn {
          to {
transform: translateX(0);
          }
        }
        </style>
        <g>
        <rect x="5" y="5" id="background" />
        <g>
           
        <foreignObject x="21" y="21" width="318" height="168">
        <div xmlns="http://www.w3.org/1999/xhtml">
        
        <table>
        <thead><tr style="transform: translateX(0);">
        <th colspan="2" id="name">${message}</th>
        </tr></thead>
        <tbody>

        
        </tbody>
        </table>
        
        </div>
        </foreignObject>
        </g>
        </g>
        </svg>`;
};

const app = express();

app.use(cors());

app.use("/", express.static("public"));

app.get("/test", (req, res) => {
  res.set({"Content-Type":"text/plain"});
  res.send("hi");
});

app.get("/api/:user", (req, res) => {
  try {
    const username = req.params.user;
    const query = {
      query: `
            query {
              user(login: "${username}") {
                name
                login
                repositories(
                  first: 100
                  ownerAffiliations: OWNER
                  orderBy: { direction: DESC, field: STARGAZERS }
                  isFork: false
                ) {
                  totalCount
                  nodes {
                    defaultBranchRef{
                      target{
                        ... on Commit{
                            history(first:10){
                               totalCount
                               edges{
                                   node{
                                       ... on Commit{
                                           additions
                                       }
                                   }
                               }
                            }
                         }
                      }
                    }
                    languages(first: 5, orderBy: { direction: DESC, field: SIZE }) {
                      nodes {
                        name
                      }
                    }
                    forkCount
                    stargazerCount
                    watchers(first:1) {
                        totalCount
                    }
                    stargazers {
                      totalCount
                    }
                  }
                }
                repositoriesContributedTo(
                  first: 100
                  includeUserRepositories: false
                  orderBy: { direction: DESC, field: STARGAZERS }
                  contributionTypes: [
                    COMMIT
                    PULL_REQUEST
                    ISSUE
                    REPOSITORY
                    PULL_REQUEST_REVIEW
                  ]
                ) {
                  totalCount
                }
                pullRequests(last: 100, orderBy: {field: CREATED_AT, direction: DESC}){
                  totalCount
                  nodes{
                     additions
                  }
                }  
                issues(last: 100, orderBy: {field: CREATED_AT, direction: DESC}){
                  totalCount
                }           
              }
           }
           `,
    };
    if (username && token) {
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify(query),
      })
        .then((resp) => resp.json())
        .then((response) => {
          res.json(response);
        })
        .catch((err) => {
          console.log(err);
          if (err.message) {
            res.send(err.message);
          } else {
            res.send(JSON.stringify(err));
          }
        });
    } else if (!username) {
      res.json({ message: "No username!" });
    } else if (!token) {
      res.json({ message: "No token!" });
    } else {
      res.json({ message: "Unknown error occured!" });
    }
  } catch (err) {
    console.log(err);
    if (err.message) {
      res.send({ message: err.message });
    } else {
      res.send({ message: JSON.stringify(err) });
    }
  }
});

app.get("/svg", (req, res) => {
  try {
    const username = req.query.user;
    const queryTheme = req.query.theme;
    const theme = themes[queryTheme] || themes["normal"];
    const query = {
      query: `
            query {
              user(login: "${username}") {
                name
                login
                repositories(
                  first: 100
                  ownerAffiliations: OWNER
                  orderBy: { direction: DESC, field: STARGAZERS }
                  isFork: false
                ) {
                  totalCount
                  nodes {
                    defaultBranchRef{
                      target{
                        ... on Commit{
                            history(first:10){
                               totalCount
                               edges{
                                   node{
                                       ... on Commit{
                                           additions
                                       }
                                   }
                               }
                            }
                         }
                      }
                    }
                    languages(first: 5, orderBy: { direction: DESC, field: SIZE }) {
                      nodes {
                        name
                      }
                    }
                    forkCount
                    stargazerCount
                    watchers(first:1) {
                        totalCount
                    }
                    stargazers {
                      totalCount
                    }
                  }
                }
                repositoriesContributedTo(
                  first: 100
                  includeUserRepositories: false
                  orderBy: { direction: DESC, field: STARGAZERS }
                  contributionTypes: [
                    COMMIT
                    PULL_REQUEST
                    ISSUE
                    REPOSITORY
                    PULL_REQUEST_REVIEW
                  ]
                ) {
                  totalCount
                }
                pullRequests(last: 100, orderBy: {field: CREATED_AT, direction: DESC}){
                  totalCount
                  nodes{
                     additions
                  }
                }
                issues(last: 100, orderBy: {field: CREATED_AT, direction: DESC}){
                  totalCount
                }           
              }
           }
           `,
    };
    res.set({"Content-Type":"image/svg+xml"});
    if (username && token) {
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        body: JSON.stringify(query),
      })
        .then((resp) => resp.json())
        .then((response) => {
          if (response.data) {
            const user = response.data.user;
            if (user) {
              const name = user.name || user.login;
              const repos = user.repositories.nodes;
              const pulls = user.pullRequests;
              const issues = user.issues;
              const repoLength = repos.length;
              const contRepoCount = formatter(
                user.repositories.totalCount + user.repositoriesContributedTo.totalCount
              );
              const pullCount = formatter(pulls.totalCount);
              const issueCount = formatter(issues.totalCount);
              let commitCount = 0,
                starCount = 0,
                forkCount = 0,
                changeCount = 0,
                watchersCount = 0;
              for (let i = 0; i < repoLength; i++) {
                starCount += repos[i].stargazerCount;
                forkCount += repos[i].forkCount;
                watchersCount += repos[i].watchers.totalCount;
                if(repos[i].defaultBranchRef) {
                    commitCount += repos[i].defaultBranchRef.target.history.totalCount;
                    const edges = repos[i].defaultBranchRef.target.history.edges;
                    let oneChangeCount = 0;
                    for (let j = 0; j < edges.length; j++) {
                       oneChangeCount += edges[j].node.additions;
                    }
                    changeCount += oneChangeCount;
                }
              }
              if(pullCount){
                  for (let i = 0; i < pulls.nodes.length; i++) {
                    changeCount += pulls.nodes[i].additions;
                  }
              }
              starCount = formatter(starCount);
              forkCount = formatter(forkCount);
              watchersCount = formatter(watchersCount);
              changeCount = formatter(changeCount);
              commitCount = formatter(commitCount);
              res.send(
                successCard(
                  theme,
                  name,
                  starCount,
                  forkCount,
                  commitCount,
                  changeCount,
                  watchersCount,
                  contRepoCount,
                  pullCount,
                  issueCount
                )
              );
            } else if (response.errors) {
              res.send(errorCard(response.errors[0].message));
            } else {
              res.send(errorCard("Origin 1: Unknown error occured!"));
            }
          } else if (response.errors) {
            res.send(errorCard(response.errors[0].message));
          } else if (response.message) {
            res.send(errorCard(response.message));
          } else if (!response) {
            res.send(errorCard("Empty response, probably wrong URL"));
          } else {
            res.send(errorCard("Origin 2: Unknown error occured!"));
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.message) {
            res.send(errorCard(err.message));
          } else {
            res.send(errorCard(JSON.stringify(err)));
          }
        });
    } else if (!username) {
      res.send(errorCard("No username!"));
    } else if (!token) {
      res.send(errorCard("No token!"));
    } else {
      res.send(errorCard("Origin 3: Unknown error occured!"));
    }
  } catch (err) {
    console.log(err);
    if (err.message) {
      res.send(errorCard(err.message));
    } else {
      res.send(errorCard(JSON.stringify(err)));
    }
  }
});

app.listen(port, () => {
  console.log(`GitHub-Profile-Stats app is listening on port ${port}`);
});
