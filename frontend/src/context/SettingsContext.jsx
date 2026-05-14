import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { CONTACT } from '../utils/constants';

/**
 * SettingsContext — fetches /api/settings on mount and provides live
 * site settings (phone, whatsapp, email, address, hero_headline, hero_subtext)
 * to every component that consumes it.
 *
 * Falls back to constants.js values if the API is unavailable.
 */

const DEFAULTS = {
  phone:          CONTACT.phone,
  whatsapp:       CONTACT.whatsapp,
  email:          CONTACT.email,
  address:        CONTACT.address,
  address_branch: CONTACT.addressBranch || '',
  hero_headline:  "Cut Your School's Power Bills by Up to 80%",
  hero_subtext:   'Zero upfront cost. Solar energy and water infrastructure built specifically for Kenyan schools. 1,400+ installations across 38 counties.',
};

const SettingsContext = createContext(DEFAULTS);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULTS);

  useEffect(() => {
    api.get('/api/settings')
      .then((res) => {
        const data = res.data?.data;
        if (data && typeof data === 'object') {
          // API returns flat key/value object
          setSettings((prev) => ({
            ...prev,
            ...(data.phone          && { phone:          data.phone }),
            ...(data.whatsapp       && { whatsapp:       data.whatsapp }),
            ...(data.email          && { email:          data.email }),
            ...(data.address        && { address:        data.address }),
            ...(data.address_branch && { address_branch: data.address_branch }),
            ...(data.hero_headline  && { hero_headline:  data.hero_headline }),
            ...(data.hero_subtext   && { hero_subtext:   data.hero_subtext }),
          }));
        }
      })
      .catch(() => {/* keep defaults */});
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
