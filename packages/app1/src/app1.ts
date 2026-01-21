import { Card } from '@monorepo/common';

export const getApp1Cards = (): Card[] => {
  return [
    {
      id: 'app1-card-1',
      title: 'User Management',
      description: 'Manage users and their permissions',
      icon: 'People',
      appName: 'Application 1',
      order: 1,
      metadata: {
        feature: 'users',
      },
    },
    {
      id: 'app1-card-2',
      title: 'Analytics',
      description: 'View application analytics and metrics',
      icon: 'Analytics',
      appName: 'Application 1',
      order: 2,
      metadata: {
        feature: 'analytics',
      },
    },
  ];
};

export interface IApp1 {
  getCards(): Promise<Card[]>;
  bootstrap(element: HTMLElement): void;
}

export const createApp1 = (): IApp1 => {
  return {
    getCards: async () => {
      return getApp1Cards();
    },
    bootstrap: (element: HTMLElement) => {
      element.innerHTML = `
        <div style="padding: 20px;">
          <h1>Application 1</h1>
          <p>This is the Application 1 interface.</p>
          <form>
            <div style="margin-bottom: 10px;">
              <label>Name:</label>
              <input type="text" placeholder="Enter name" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      `;
    },
  };
};
