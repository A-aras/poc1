import { Card } from '@monorepo/common';

export const getApp3Cards = (): Card[] => {
  return [
    {
      id: 'app3-card-1',
      title: 'Settings',
      description: 'Manage application settings',
      icon: 'Settings',
      appName: 'Application 3',
      order: 1,
      metadata: {
        feature: 'settings',
      },
    },
    {
      id: 'app3-card-2',
      title: 'Configuration',
      description: 'Configure system parameters',
      icon: 'Tune',
      appName: 'Application 3',
      order: 2,
      metadata: {
        feature: 'configuration',
      },
    },
  ];
};

export interface IApp3 {
  getCards(): Promise<Card[]>;
  bootstrap(element: HTMLElement): void;
}

export const createApp3 = (): IApp3 => {
  return {
    getCards: async () => {
      return getApp3Cards();
    },
    bootstrap: (element: HTMLElement) => {
      element.innerHTML = `
        <div style="padding: 20px;">
          <h1>Application 3</h1>
          <p>This is the Application 3 interface.</p>
          <div style="margin: 20px 0;">
            <label style="display: block; margin-bottom: 10px;">
              <input type="checkbox" /> Enable Feature A
            </label>
            <label style="display: block; margin-bottom: 10px;">
              <input type="checkbox" /> Enable Feature B
            </label>
            <label style="display: block;">
              <input type="checkbox" /> Enable Feature C
            </label>
          </div>
        </div>
      `;
    },
  };
};
