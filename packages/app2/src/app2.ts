import { Card } from '@monorepo/common';

export const getApp2Cards = (): Card[] => {
  return [
    {
      id: 'app2-card-1',
      title: 'Reports',
      description: 'Generate and view reports',
      icon: 'Description',
      appName: 'Application 2',
      order: 1,
      metadata: {
        feature: 'reports',
      },
    },
    {
      id: 'app2-card-2',
      title: 'Audit Log',
      description: 'View system audit logs',
      icon: 'History',
      appName: 'Application 2',
      order: 2,
      metadata: {
        feature: 'audit',
      },
    },
  ];
};

export interface IApp2 {
  getCards(): Promise<Card[]>;
  bootstrap(element: HTMLElement): void;
}

export const createApp2 = (): IApp2 => {
  return {
    getCards: async () => {
      return getApp2Cards();
    },
    bootstrap: (element: HTMLElement) => {
      element.innerHTML = `
        <div style="padding: 20px;">
          <h1>Application 2</h1>
          <p>This is the Application 2 interface.</p>
          <table style="border-collapse: collapse; width: 100%;">
            <tr style="border: 1px solid #ddd;">
              <th style="border: 1px solid #ddd; padding: 8px;">ID</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Value</th>
            </tr>
            <tr style="border: 1px solid #ddd;">
              <td style="border: 1px solid #ddd; padding: 8px;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Item 1</td>
              <td style="border: 1px solid #ddd; padding: 8px;">100</td>
            </tr>
          </table>
        </div>
      `;
    },
  };
};
