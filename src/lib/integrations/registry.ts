export type BaseIntegrationField = {
	label: string;
	required?: boolean;
	default?: string | string[];
};

export type TextIntegrationField = BaseIntegrationField & {
	type: 'text' | 'password' | 'checkbox';
};

export type OptionsIntegrationField = BaseIntegrationField & {
	type: 'select' | 'multiselect' | 'multiinput';
	options: { id: string; label: string; selected: boolean }[];
};

export type IntegrationField = TextIntegrationField | OptionsIntegrationField;

export type IntegrationFields = {
	[key: string]: IntegrationField;
};

export type Integration = {
	id: string;
	name: string;
	icon: string;
	fields: IntegrationFields;
};

// Google OAuth integration
const GOOGLE_SCOPES_FIELD: OptionsIntegrationField = {
	type: 'multiselect',
	label: 'Scopes',
	options: [
		{ id: 'email', label: 'Email', selected: true },
		{ id: 'profile', label: 'Profile', selected: true },
		{ id: 'openid', label: 'OpenID', selected: true },
		{ id: 'https://www.googleapis.com/auth/drive', label: 'Google Drive', selected: false },
		{
			id: 'https://www.googleapis.com/auth/calendar',
			label: 'Google Calendar',
			selected: false
		},
		{
			id: 'https://www.googleapis.com/auth/gmail.readonly',
			label: 'Gmail (Read Only)',
			selected: false
		}
	]
}

const googleButtonIntegration: Integration = {
	id: 'google',
	name: 'Google',
	icon: 'google',
	fields: {
		scopes: GOOGLE_SCOPES_FIELD
	}
};

const googleClientIntegration: Integration = {
	id: 'google',
	name: 'Google - Oauth Client',
	icon: 'google',
	fields: {
		client_id: {
			type: 'text',
			label: 'Client ID',
			required: true,
		},
		client_secret: {
			type: 'password',
			label: 'Client Secret',
			required: true
		},
		redirect_uri: {
			type: 'text',
			label: 'Redirect URI',
			default:
				(typeof window !== 'undefined' ? window.location.origin : process.env.API_URL) +
				'/api/oauth/google/callback',
			required: true
		},
		scopes: GOOGLE_SCOPES_FIELD
	}
};

const facebookIntegration: Integration = {
  id: 'facebook',
  name: 'Facebook',
  icon: 'facebook',
  fields: {
    scopes: {
      type: 'multiselect',
      label: 'Permissions',
      required: true,
      options: [
        { id: 'public_profile', label: 'Public Profile', selected: true },
        { id: 'email', label: 'Email Address', selected: true },
        { id: 'pages_manage_posts', label: 'Manage Page Posts', selected: false },
        { id: 'instagram_basic', label: 'Instagram Basic', selected: false }
      ]
    }
  }
};

const twitterIntegration: Integration = {
  id: 'twitter',
  name: 'Twitter',
  icon: 'twitter',
  fields: {
    scopes: {
      type: 'multiselect',
      label: 'Permissions',
      required: true,
      options: [
        { id: 'tweet.read', label: 'Read Tweets', selected: true },
        { id: 'tweet.write', label: 'Write Tweets', selected: false },
        { id: 'users.read', label: 'Read Users', selected: true },
        { id: 'dm.read', label: 'Read Direct Messages', selected: false }
      ]
    }
  }
};

const githubIntegration: Integration = {
	id: 'github',
	name: 'GitHub',
	icon: 'github',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Scopes',
			required: true,
			options: [
				{ id: 'repo', label: 'Repository Access', selected: true },
				{ id: 'user', label: 'User Information', selected: true },
				{ id: 'read:org', label: 'Organization Read Access', selected: false },
				{ id: 'workflow', label: 'Workflow Control', selected: false }
			]
		}
	}
};

const microsoftIntegration: Integration = {
  id: 'microsoft',
  name: 'Microsoft',
  icon: 'microsoft',
  fields: {
    scopes: {
      type: 'multiselect',
      label: 'Permissions',
      required: true,
      options: [
        { id: 'User.Read', label: 'Read User Profile', selected: true },
        { id: 'Mail.Read', label: 'Read Mail', selected: false },
        { id: 'Files.Read', label: 'Read Files', selected: false },
        { id: 'Calendars.Read', label: 'Read Calendar', selected: false }
      ]
    },
    tenantId: {
      type: 'text',
      label: 'Azure AD Tenant ID',
      required: false,
      default: 'common'
    }
  }
};


const linkedinIntegration: Integration = {
	id: 'linkedin',
	name: 'LinkedIn',
	icon: 'linkedin',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'r_liteprofile', label: 'Profile Access', selected: true },
				{ id: 'r_emailaddress', label: 'Email Access', selected: true },
				{ id: 'w_member_social', label: 'Post & Comment', selected: false },
				{ id: 'r_organization_admin', label: 'Organization Admin', selected: false }
			]
		}
	}
};

const slackIntegration: Integration = {
	id: 'slack',
	name: 'Slack',
	icon: 'slack',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Bot Permissions',
			required: true,
			options: [
				{ id: 'channels:read', label: 'View Channels', selected: true },
				{ id: 'chat:write', label: 'Send Messages', selected: true },
				{ id: 'files:read', label: 'View Files', selected: false },
				{ id: 'users:read', label: 'View Users', selected: false }
			]
		}
	}
};

const dropboxIntegration: Integration = {
	id: 'dropbox',
	name: 'Dropbox',
	icon: 'dropbox',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Access Permissions',
			required: true,
			options: [
				{ id: 'files.content.read', label: 'Read Files', selected: true },
				{ id: 'files.content.write', label: 'Write Files', selected: false },
				{ id: 'sharing.read', label: 'View Sharing', selected: true },
				{ id: 'account_info.read', label: 'Account Info', selected: true }
			]
		}
	}
};

const spotifyIntegration: Integration = {
	id: 'spotify',
	name: 'Spotify',
	icon: 'spotify',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'user-read-private', label: 'Read Private Data', selected: true },
				{ id: 'playlist-read-private', label: 'Read Private Playlists', selected: true },
				{ id: 'playlist-modify-public', label: 'Modify Public Playlists', selected: false },
				{ id: 'user-library-read', label: 'Read User Library', selected: false }
			]
		}
	}
};

const awsIntegration: Integration = {
	id: 'aws',
	name: 'Amazon Web Services',
	icon: 'aws',
	fields: {
		accessKeyId: {
			type: 'text',
			label: 'Access Key ID',
			required: true,
			default: ''
		},
		secretAccessKey: {
			type: 'password',
			label: 'Secret Access Key',
			required: true,
			default: ''
		},
		region: {
			type: 'select',
			label: 'Region',
			required: true,
			options: [
				{ id: 'us-east-1', label: 'US East (N. Virginia)', selected: true },
				{ id: 'us-west-2', label: 'US West (Oregon)', selected: false },
				{ id: 'eu-west-1', label: 'EU (Ireland)', selected: false }
			]
		}
	}
};

const redditIntegration: Integration = {
	id: 'reddit',
	name: 'Reddit',
	icon: 'reddit',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'identity', label: 'Identity', selected: true },
				{ id: 'read', label: 'Read Content', selected: true },
				{ id: 'submit', label: 'Submit Content', selected: false },
				{ id: 'subscribe', label: 'Manage Subscriptions', selected: false }
			]
		}
	}
};

const instagramIntegration: Integration = {
	id: 'instagram',
	name: 'Instagram',
	icon: 'instagram',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'basic', label: 'Basic Access', selected: true },
				{ id: 'pages_show_list', label: 'Pages Access', selected: true },
				{ id: 'instagram_basic', label: 'Instagram Basic', selected: true },
				{ id: 'instagram_manage_comments', label: 'Manage Comments', selected: false }
			]
		}
	}
};

const salesforceIntegration: Integration = {
	id: 'salesforce',
	name: 'Salesforce',
	icon: 'salesforce',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'api', label: 'API Access', selected: true },
				{ id: 'chatter_api', label: 'Chatter API', selected: false },
				{ id: 'custom_permissions', label: 'Custom Permissions', selected: false },
				{ id: 'wave_api', label: 'Analytics API', selected: false }
			]
		},
		environment: {
			type: 'select',
			label: 'Environment',
			required: true,
			options: [
				{ id: 'production', label: 'Production', selected: true },
				{ id: 'sandbox', label: 'Sandbox', selected: false }
			]
		}
	}
};

const paypalIntegration: Integration = {
	id: 'paypal',
	name: 'PayPal',
	icon: 'paypal',
	fields: {
		environment: {
			type: 'select',
			label: 'Environment',
			required: true,
			options: [
				{ id: 'sandbox', label: 'Sandbox', selected: true },
				{ id: 'production', label: 'Production', selected: false }
			]
		},
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'openid', label: 'OpenID Connect', selected: true },
				{ id: 'profile', label: 'Profile', selected: true },
				{ id: 'payments', label: 'Payments', selected: false },
				{ id: 'transactions', label: 'Transactions', selected: false }
			]
		}
	}
};

const stripeIntegration: Integration = {
	id: 'stripe',
	name: 'Stripe',
	icon: 'stripe',
	fields: {
		mode: {
			type: 'select',
			label: 'Mode',
			required: true,
			options: [
				{ id: 'test', label: 'Test Mode', selected: true },
				{ id: 'live', label: 'Live Mode', selected: false }
			]
		},
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'read_write', label: 'Read & Write', selected: true },
				{ id: 'read_only', label: 'Read Only', selected: false }
			]
		}
	}
};

const twilioIntegration: Integration = {
	id: 'twilio',
	name: 'Twilio',
	icon: 'twilio',
	fields: {
		accountSid: {
			type: 'text',
			label: 'Account SID',
			required: true,
			default: ''
		},
		authToken: {
			type: 'password',
			label: 'Auth Token',
			required: true,
			default: ''
		}
	}
};

const boxIntegration: Integration = {
	id: 'box',
	name: 'Box',
	icon: 'box',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'root_readwrite', label: 'Root Read/Write', selected: true },
				{ id: 'manage_users', label: 'Manage Users', selected: false },
				{ id: 'manage_groups', label: 'Manage Groups', selected: false }
			]
		}
	}
};

const pinterestIntegration: Integration = {
	id: 'pinterest',
	name: 'Pinterest',
	icon: 'pinterest',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'read_public', label: 'Read Public Data', selected: true },
				{ id: 'write_public', label: 'Write Public Data', selected: false },
				{ id: 'read_private', label: 'Read Private Data', selected: false }
			]
		}
	}
};

const tumblrIntegration: Integration = {
	id: 'tumblr',
	name: 'Tumblr',
	icon: 'tumblr',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'write', label: 'Write Blog Content', selected: true },
				{ id: 'read', label: 'Read Blog Content', selected: true }
			]
		}
	}
};

const foursquareIntegration: Integration = {
	id: 'foursquare',
	name: 'Foursquare',
	icon: 'foursquare',
	fields: {
		version: {
			type: 'text',
			label: 'API Version',
			required: true,
			default: '20231231'
		}
	}
};

const uberIntegration: Integration = {
	id: 'uber',
	name: 'Uber',
	icon: 'uber',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'profile', label: 'Profile Access', selected: true },
				{ id: 'history', label: 'Trip History', selected: false },
				{ id: 'places', label: 'Places', selected: false }
			]
		}
	}
};

const yelpIntegration: Integration = {
	id: 'yelp',
	name: 'Yelp',
	icon: 'yelp',
	fields: {
		apiKey: {
			type: 'password',
			label: 'API Key',
			required: true,
			default: ''
		}
	}
};

const bitbucketIntegration: Integration = {
	id: 'bitbucket',
	name: 'Bitbucket',
	icon: 'bitbucket',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'repository', label: 'Repository Access', selected: true },
				{ id: 'pipeline', label: 'Pipeline Access', selected: false },
				{ id: 'pullrequest', label: 'Pull Request Access', selected: false }
			]
		}
	}
};

const mailchimpIntegration: Integration = {
	id: 'mailchimp',
	name: 'Mailchimp',
	icon: 'mailchimp',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Access Levels',
			required: true,
			options: [
				{ id: 'lists-read', label: 'Read Lists', selected: true },
				{ id: 'lists-write', label: 'Write Lists', selected: false },
				{ id: 'campaigns-read', label: 'Read Campaigns', selected: false }
			]
		}
	}
};

const zendeskIntegration: Integration = {
	id: 'zendesk',
	name: 'Zendesk',
	icon: 'zendesk',
	fields: {
		subdomain: {
			type: 'text',
			label: 'Subdomain',
			required: true,
			default: ''
		},
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'read', label: 'Read Access', selected: true },
				{ id: 'write', label: 'Write Access', selected: false }
			]
		}
	}
};

const trelloIntegration: Integration = {
	id: 'trello',
	name: 'Trello',
	icon: 'trello',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'read', label: 'Read Access', selected: true },
				{ id: 'write', label: 'Write Access', selected: false },
				{ id: 'account', label: 'Account Access', selected: true }
			]
		}
	}
};

const asanaIntegration: Integration = {
	id: 'asana',
	name: 'Asana',
	icon: 'asana',
	fields: {
		workspace: {
			type: 'text',
			label: 'Workspace ID',
			required: false,
			default: ''
		}
	}
};

const gitlabIntegration: Integration = {
	id: 'gitlab',
	name: 'GitLab',
	icon: 'gitlab',
	fields: {
		scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'read_user', label: 'Read User', selected: true },
				{ id: 'read_api', label: 'API Access', selected: true },
				{ id: 'read_repository', label: 'Read Repository', selected: true },
				{ id: 'write_repository', label: 'Write Repository', selected: false }
			]
		}
	}
};

const oktaIntegration: Integration = {
	id: 'okta',
	name: 'Okta',
	icon: 'okta',
	fields: {
		domain: {
			type: 'text',
			label: 'Okta Domain',
			required: true,
			default: ''
		},
    scopes: {
			type: 'multiselect',
			label: 'Permissions',
			required: true,
			options: [
				{ id: 'read_users', label: 'Read Users', selected: true },
				{ id: 'write_users', label: 'Write Users', selected: false },
				{ id: 'read_groups', label: 'Read Groups', selected: false }
			]
		}
  }
};

const squareIntegration: Integration = {
  id: 'square',
  name: 'Square',
  icon: 'square',
  fields: {
    environment: {
      type: 'select',
      label: 'Environment',
      required: true,
      options: [
        { id: 'sandbox', label: 'Sandbox', selected: true },
        { id: 'production', label: 'Production', selected: false }
      ]
    },
    scopes: {
      type: 'multiselect',
      label: 'Permissions',
      required: true,
      options: [
        { id: 'MERCHANT_PROFILE_READ', label: 'Read Merchant Profile', selected: true },
        { id: 'PAYMENTS_READ', label: 'Read Payments', selected: true },
        { id: 'PAYMENTS_WRITE', label: 'Process Payments', selected: false },
        { id: 'ORDERS_READ', label: 'Read Orders', selected: false }
      ]
    }
  }
};

// Export all integrations
const integrations: Integration[] = [
  googleButtonIntegration,
  googleClientIntegration,
  facebookIntegration,
  twitterIntegration,
  githubIntegration,
  microsoftIntegration,
  linkedinIntegration,
  slackIntegration,
  dropboxIntegration,
  spotifyIntegration,
  awsIntegration,
  redditIntegration,
  instagramIntegration,
  salesforceIntegration,
  paypalIntegration,
  stripeIntegration,
  twilioIntegration,
  boxIntegration,
  pinterestIntegration,
  tumblrIntegration,
  foursquareIntegration,
  uberIntegration,
  yelpIntegration,
  bitbucketIntegration,
  mailchimpIntegration,
  zendeskIntegration,
  trelloIntegration,
  asanaIntegration,
  gitlabIntegration,
  oktaIntegration,
  squareIntegration
];

export function getAllIntegrations(): Integration[] {
  return integrations;
}

export function getIntegrationById(id: string): Integration | undefined {
	return integrations.find((integration) => integration.id === id);
}
