import { pluginMap, jotainihanmuuta } from './shared_config.json'

const config = {
  pluginMap: pluginMap,
  languages: ['fi', 'sv', 'en'],
  activeLanguage: 'fi',
  apiBaseUrl: (typeof window !== 'undefined' ? window.API_BASE_URL : null) || 'http://localhost:8000/',
  uiConfig: typeof window !== 'undefined' ? window.UI_CONFIG : null,
};

export default config;
