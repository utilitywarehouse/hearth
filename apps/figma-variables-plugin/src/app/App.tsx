/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable  @typescript-eslint/no-unsafe-return */
/* eslint-disable  @typescript-eslint/no-unsafe-call */
import React, { useEffect } from 'react';
// @ts-expect-error - No type definitions available
import logo from './assets/logo.png';

// Import font files directly so webpack processes them
// @ts-expect-error - No type definitions for font files
import dmSansRegular from '../../../../packages/fonts/files/woff2/DMSans-Regular.woff2';
// @ts-expect-error - No type definitions for font files
import dmSansItalic from '../../../../packages/fonts/files/woff2/DMSans-Italic.woff2';
// @ts-expect-error - No type definitions for font files
import dmSansSemiBold from '../../../../packages/fonts/files/woff2/DMSans-SemiBold.woff2';
// @ts-expect-error - No type definitions for font files
import dmSansSemiBoldItalic from '../../../../packages/fonts/files/woff2/DMSans-SemiBoldItalic.woff2';
// @ts-expect-error - No type definitions for font files
import dmSansBold from '../../../../packages/fonts/files/woff2/DMSans-Bold.woff2';
// @ts-expect-error - No type definitions for font files
import dmSansBoldItalic from '../../../../packages/fonts/files/woff2/DMSans-BoldItalic.woff2';
// @ts-expect-error - No type definitions for font files
import dmMonoMedium from '../../../../packages/fonts/files/woff2/DMMono-Medium.woff2';
// @ts-expect-error - No type definitions for font files
import dmMonoMediumItalic from '../../../../packages/fonts/files/woff2/DMMono-MediumItalic.woff2';
// @ts-expect-error - No type definitions for font files
import comicHamsSemiBold from '../../../../packages/fonts/files/woff2/ComicHams-SemiBoldFlare.woff2';
// @ts-expect-error - No type definitions for font files
import comicHamsBold from '../../../../packages/fonts/files/woff2/ComicHams-BoldFlare.woff2';

import '@utilitywarehouse/hearth-css-reset';
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  Heading,
  PasswordInput,
  Spinner,
} from '@utilitywarehouse/hearth-react';
import '@utilitywarehouse/hearth-react/styles.css';
import '@utilitywarehouse/hearth-tokens/index.css';
import './styles/ui.css';
import { encodeContent, kebabCase } from './utils';

function App() {
  // Add console log to see if component is rendering
  console.log('App component rendering');

  // Create font faces dynamically
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'DM Sans';
        font-style: normal;
        font-weight: 400;
        src: url('${dmSansRegular}') format('woff2');
      }
      @font-face {
        font-family: 'DM Sans';
        font-style: italic;
        font-weight: 400;
        src: url('${dmSansItalic}') format('woff2');
      }
      @font-face {
        font-family: 'DM Sans';
        font-style: normal;
        font-weight: 600;
        src: url('${dmSansSemiBold}') format('woff2');
      }
      @font-face {
        font-family: 'DM Sans';
        font-style: italic;
        font-weight: 600;
        src: url('${dmSansSemiBoldItalic}') format('woff2');
      }
      @font-face {
        font-family: 'DM Sans';
        font-style: normal;
        font-weight: 700;
        src: url('${dmSansBold}') format('woff2');
      }
      @font-face {
        font-family: 'DM Sans';
        font-style: italic;
        font-weight: 700;
        src: url('${dmSansBoldItalic}') format('woff2');
      }
      @font-face {
        font-family: 'DM Mono';
        font-style: normal;
        font-weight: 500;
        src: url('${dmMonoMedium}') format('woff2');
      }
      @font-face {
        font-family: 'DM Mono';
        font-style: italic;
        font-weight: 500;
        src: url('${dmMonoMediumItalic}') format('woff2');
      }
      @font-face {
        font-family: 'Comic Hams';
        font-style: normal;
        font-weight: 600;
        src: url('${comicHamsSemiBold}') format('woff2');
      }
      @font-face {
        font-family: 'Comic Hams';
        font-style: normal;
        font-weight: 700;
        src: url('${comicHamsBold}') format('woff2');
      }
    `;
    document.head.appendChild(style);
  }, []);

  const [githubToken, setGithubToken] = React.useState('');
  const [tokenLoaded, setTokenLoaded] = React.useState(false);
  const [showTokenInput, setShowTokenInput] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState('');
  const [exporting, setExporting] = React.useState(false);
  const [collections, setCollections] = React.useState([]);
  const [loadingCollections, setLoadingCollections] = React.useState(true);
  const [selectedCollections, setSelectedCollections] = React.useState([]);
  const [loadingImport, setLoadingImport] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState('');
  const repoOwner = 'utilitywarehouse';
  const repoName = 'hearth';
  const branchName = 'main';
  const [selectAll, setSelectAll] = React.useState(false);
  const [statusType, setStatusType] = React.useState<'positive' | 'danger' | 'info'>('info');

  React.useEffect(() => {
    // Load saved GitHub token from clientStorage
    parent.postMessage({ pluginMessage: { type: 'load-token' } }, '*');
    parent.postMessage({ pluginMessage: { type: 'get-filename' } }, '*');
    // Request available collections from the plugin
    parent.postMessage({ pluginMessage: { type: 'get-collections' } }, '*');
  }, []);

  useEffect(() => {
    if (statusMessage) {
      const timeout = setTimeout(() => {
        setStatusMessage('');
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [statusMessage]);

  // Handle messages from the plugin code
  window.onmessage = async event => {
    const { pluginMessage } = event.data;
    if (pluginMessage.type === 'token-loaded') {
      setGithubToken((pluginMessage?.token as string) || '');
      if (pluginMessage?.token) {
        setTokenLoaded(true);
        setStatusMessage('GitHub token loaded.');
        setStatusType('positive');
      }
    } else if (pluginMessage.type === 'variables-exported') {
      const tokensData = pluginMessage.data;
      setStatusMessage('Variables exported. Creating PRs...');
      setStatusType('info');
      await createPullRequests(tokensData);
      setExporting(false);
    }
    if (pluginMessage.type === 'collections-loaded') {
      console.log('Collections loaded:', pluginMessage.data);
      setCollections(pluginMessage.data);
      setLoadingCollections(false);
    } else if (pluginMessage.type === 'show-loading') {
      setLoadingImport(true);
      setLoadingText('Importing variables, please wait...');
    } else if (pluginMessage.type === 'hide-loading') {
      setLoadingImport(false);
      setLoadingText('');
    }
  };

  useEffect(() => {
    let timeout;
    if (loadingText === 'Importing variables, please wait...') {
      timeout = setTimeout(() => {
        setLoadingText("Shouldn't be much longer now...");
      }, 5000);
    }
    if (loadingText === "Shouldn't be much longer now...") {
      timeout = setTimeout(() => {
        setLoadingText('Just a few more seconds...');
      }, 10000);
    }
    return () => clearTimeout(timeout);
  }, [loadingText]);

  // Save GitHub token to clientStorage
  const saveToken = () => {
    parent.postMessage({ pluginMessage: { type: 'save-token', token: githubToken } }, '*');
    setShowTokenInput(false);
    if (githubToken) {
      setTokenLoaded(true);
    }
    setStatusMessage('GitHub token saved.');
    setStatusType('positive');
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCollections([]);
    } else {
      const allKeys = collections.map(collection => collection.id);
      setSelectedCollections(allKeys);
    }
    setSelectAll(!selectAll);
  };

  // Export variables and initiate PR creation
  const exportVariables = () => {
    setExporting(true);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    console.log('Exporting with selectedCollections:', selectedCollections);
    parent.postMessage(
      {
        pluginMessage: {
          type: 'export-variables',
          selectedCollections: selectedCollections,
        },
      },
      '*'
    );
  };

  // Add a function to fetch the latest SHA before updating
  async function getFileSha(
    apiBase: string,
    repoOwner: string,
    repoName: string,
    filePath: string,
    branchName: string,
    headers: Record<string, string>
  ): Promise<string | undefined> {
    const getFileResponse = await fetch(
      `${apiBase}/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${branchName}`,
      { headers }
    );
    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json();
      return fileData.sha;
    } else if (getFileResponse.status === 404) {
      return undefined; // File does not exist
    } else {
      throw new Error(`Failed to get file information for ${filePath}.`);
    }
  }

  // Create pull requests for all collections in a single PR
  const createPullRequests = async tokensData => {
    setStatusMessage('Creating a single pull request for all collections...');

    // // Deubgging: log the tokensData
    // return console.log(
    //   'Tokens data to be exported:',
    //   tokensData.map(item => ({
    //     collectionName: item.collectionName,
    //     tokensJson: JSON.parse(item.tokensJson),
    //   }))
    // );

    try {
      const apiBase = 'https://api.github.com';
      const headers = {
        Authorization: `token ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      };

      setLoadingText('Getting branch SHA...');

      // Get the SHA of the base branch
      const branchResponse = await fetch(
        `${apiBase}/repos/${repoOwner}/${repoName}/git/ref/heads/${branchName}`,
        { headers }
      );
      if (!branchResponse.ok) throw new Error('Failed to fetch branch information.');
      const branchData = await branchResponse.json();
      const baseSha = branchData.object.sha;

      setLoadingText('Creating a new branch...');

      // Create a new branch
      const newBranchName = `figma-export-${Date.now()}`;
      const refResponse = await fetch(`${apiBase}/repos/${repoOwner}/${repoName}/git/refs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ref: `refs/heads/${newBranchName}`,
          sha: baseSha,
        }),
      });
      if (!refResponse.ok) throw new Error('Failed to create new branch.');

      setLoadingText('Updating files...');

      // Prepare all file updates
      for (const { collectionName, tokensJson } of tokensData) {
        const kebabCollectionName = kebabCase(collectionName);
        const filePath = `packages/tokens/raw/${kebabCollectionName}.json`;

        let fileSha;
        try {
          fileSha = await getFileSha(
            apiBase,
            repoOwner,
            repoName,
            filePath,
            newBranchName,
            headers
          );
        } catch (error) {
          throw new Error(`Failed to fetch SHA for ${collectionName}.json: ${error.message}`);
        }

        const content = encodeContent(tokensJson);
        let fileBody = {
          message: `Export Figma variables for ${collectionName}`,
          content: content,
          branch: newBranchName,
          ...(fileSha && { sha: fileSha }),
        };

        let fileResponse = await fetch(
          `${apiBase}/repos/${repoOwner}/${repoName}/contents/${filePath}`,
          {
            method: 'PUT',
            headers,
            body: JSON.stringify(fileBody),
          }
        );

        if (fileResponse.status === 422 && fileSha) {
          console.warn(`Conflict detected for ${collectionName}.json. Retrying...`);
          fileSha = await getFileSha(
            apiBase,
            repoOwner,
            repoName,
            filePath,
            newBranchName,
            headers
          );
          if (fileSha) {
            fileBody = { ...fileBody, sha: fileSha };
            fileResponse = await fetch(
              `${apiBase}/repos/${repoOwner}/${repoName}/contents/${filePath}`,
              {
                method: 'PUT',
                headers,
                body: JSON.stringify(fileBody),
              }
            );
            if (!fileResponse.ok)
              throw new Error(`Failed to update ${collectionName}.json on retry.`);
          } else {
            throw new Error(`Failed to resolve conflict for ${collectionName}.json.`);
          }
        } else if (!fileResponse.ok) {
          throw new Error(`Failed to update ${collectionName}.json.`);
        }
      }

      setLoadingText('Creating a pull request...');

      // Create a single pull request
      const prResponse = await fetch(`${apiBase}/repos/${repoOwner}/${repoName}/pulls`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: `Export Figma Variables - ${tokensData.length} Collections`,
          head: newBranchName,
          base: branchName,
          body: `This PR contains exported Figma variables for all selected collections. It includes the following changes:\n\n${tokensData
            .map(
              ({ collectionName }) =>
                `- Exported variables to packages/tokens/raw/${kebabCase(collectionName)}.json`
            )
            .join('\n')}`,
        }),
      });
      if (!prResponse.ok) throw new Error('Failed to create pull request.');

      setStatusMessage('Pull request created successfully.');
      setStatusType('positive');
    } catch (error) {
      console.error(error);
      setStatusMessage(`Error: ${error.message}`);
      setStatusType('danger');
    } finally {
      setExporting(false);
      setLoadingImport(false);
      setLoadingText('');
    }
  };

  const editToken = () => {
    setShowTokenInput(true);
  };

  function resizeWindow(e) {
    const size = {
      w: Math.max(50, Math.floor(e.clientX + 5)),
      h: Math.max(50, Math.floor(e.clientY + 5)),
    };
    parent.postMessage({ pluginMessage: { type: 'resize', size: size } }, '*');
  }

  return (
    <Box backgroundColor="primary">
      <Flex backgroundColor="brand" padding="200" alignItems="center" justifyContent="between">
        <img src={logo} />
        {tokenLoaded && !showTokenInput && (
          <Button onClick={editToken} size="sm">
            Edit Token
          </Button>
        )}
      </Flex>
      <Flex direction="column" padding="200" gap="200">
        <Heading size="md">Export Figma Variables</Heading>

        {!githubToken && (
          <Alert
            colorScheme="info"
            text="Enter your GitHub token to be able to export the variables and create a PR."
          />
        )}
        {loadingImport && <Alert colorScheme="info" text="Importing variables, please wait..." />}
        {((tokenLoaded && showTokenInput) || !tokenLoaded) && (
          <Card
            alignItems="end"
            gap="100"
            variant="subtle"
            colorScheme="neutralStrong"
            wrap="wrap"
            direction="row"
          >
            <PasswordInput
              id="github-token"
              label="GitHub Token"
              value={githubToken}
              onChange={e => setGithubToken(e.target.value)}
              required
            />
            <Button onClick={saveToken}>Save Token</Button>
          </Card>
        )}
        {statusMessage && <Alert colorScheme={statusType} text={statusMessage} />}
        {githubToken && (
          <Card
            variant="subtle"
            colorScheme="neutralStrong"
            direction="column"
            position="relative"
            gap="300"
          >
            <Flex gap="300" position="relative" direction="column">
              {(exporting || loadingImport) && (
                <Flex
                  position="absolute"
                  width="100%"
                  bottom="0"
                  height="100%"
                  left="0"
                  padding="200"
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor="secondary"
                  style={{ zIndex: 1 }}
                >
                  <Spinner />
                </Flex>
              )}
              <CheckboxGroup
                label="Select Collections to Export:"
                helperText="Published library collections in this file"
              >
                {!loadingCollections && collections.length > 0 && (
                  <Checkbox
                    id="select-all"
                    value="select-all"
                    label="Select All"
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                )}
              </CheckboxGroup>
              <Divider decorative />
              {loadingCollections && <Spinner />}
              {!loadingCollections && collections.length === 0 && (
                <Alert
                  colorScheme="info"
                  text="No collections found in this file. Please create a collection in the library."
                />
              )}
              {!loadingCollections && collections.length > 0 && (
                <CheckboxGroup
                  value={selectedCollections}
                  onValueChange={val => setSelectedCollections(val)}
                >
                  {collections.map(collection => (
                    <Checkbox
                      key={collection.id}
                      id={`checkbox-${collection.id}`}
                      value={collection.id}
                      label={collection.name}
                      helperText={collection.libraryName}
                    />
                  ))}
                </CheckboxGroup>
              )}
            </Flex>

            <Flex direction="column">
              <Button
                onClick={exportVariables}
                disabled={exporting || loadingImport || loadingCollections}
                style={{ width: '100%' }}
              >
                {exporting ? 'Exporting...' : 'Export Variables'}
              </Button>
            </Flex>
          </Card>
        )}

        <svg
          id="corner"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onPointerDown={e => {
            e.currentTarget.onpointermove = resizeWindow;
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerUp={e => {
            e.currentTarget.onpointermove = null;
            e.currentTarget.releasePointerCapture(e.pointerId);
          }}
        >
          <path d="M16 0V16H0L16 0Z" fill="white" />
          <path d="M6.22577 16H3L16 3V6.22576L6.22577 16Z" fill="#8C8C8C" />
          <path d="M11.8602 16H8.63441L16 8.63441V11.8602L11.8602 16Z" fill="#8C8C8C" />
        </svg>
      </Flex>
    </Box>
  );
}

export default App;
