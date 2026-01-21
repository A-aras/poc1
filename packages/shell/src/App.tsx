import React from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  CssBaseline,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '@monorepo/common';
import { setSelectedItem } from '@monorepo/common';
import * as Icons from '@mui/icons-material';
import Dashboard from './pages/Dashboard';
import AppContainer from './components/AppContainer';

const DRAWER_WIDTH = 240;

interface NavigationItemProps {
  item: any;
}

const NavigationItemComponent: React.FC<NavigationItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const selectedItemId = useAppSelector((state) => state.navigation.selectedItemId);

  const iconName = item.icon as keyof typeof Icons;
  const IconComponent = Icons[iconName] || Icons.Extension;

  const isSelected = selectedItemId === item.id;

  const handleClick = () => {
    dispatch(setSelectedItem(item.id));
  };

  return (
    <ListItem
      button
      selected={isSelected}
      onClick={handleClick}
      sx={{
        backgroundColor: isSelected ? 'rgba(25, 103, 210, 0.08)' : 'transparent',
        borderLeft: isSelected ? '4px solid #1967d2' : 'none',
        '&:hover': {
          backgroundColor: 'rgba(25, 103, 210, 0.04)',
        },
      }}
    >
      <ListItemIcon>
        <IconComponent fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={item.label} />
    </ListItem>
  );
};

export default function AppLayout() {
  const navigation = useAppSelector((state) => state.navigation.items);
  const selectedItemId = useAppSelector((state) => state.navigation.selectedItemId);
  const { tabs, activeTabId } = useAppSelector((state) => state.tabs);
  const dispatch = useAppDispatch();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    dispatch({ type: 'tabs/setActiveTab', payload: newValue });
  };

  const renderContent = () => {
    const activeTab = tabs.find((tab) => tab.id === activeTabId);

    if (activeTab?.isDashboard) {
      return <Dashboard />;
    }

    if (activeTab?.type === 'app') {
      return <AppContainer appId={activeTab.id} appName={activeTab.appName || ''} />;
    }

    return <Dashboard />;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Micro-frontend Shell
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            marginTop: '64px',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Navigation
          </Typography>
        </Box>
        <Divider />
        <List>
          {navigation.map((item) => (
            <React.Fragment key={item.id}>
              <NavigationItemComponent item={item} />
              {item.children && (
                <List sx={{ pl: 4 }}>
                  {item.children.map((child: any) => (
                    <NavigationItemComponent key={child.id} item={child} />
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          marginTop: '64px',
        }}
      >
        {/* Tabs */}
        {tabs.length > 0 && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTabId} onChange={handleTabChange}>
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  label={tab.label}
                  value={tab.id}
                  iconPosition="end"
                  icon={
                    !tab.isDashboard ? (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch({ type: 'tabs/removeTab', payload: tab.id });
                        }}
                      >
                        <Icons.Close fontSize="small" />
                      </IconButton>
                    ) : undefined
                  }
                />
              ))}
            </Tabs>
          </Box>
        )}

        {/* Content Area */}
        <Box sx={{ mt: 2 }}>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
}
