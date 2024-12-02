const { handleAccount, handleNotification, handleHistory, handleSignOut, checkLoginStatus } = require('./navigation');

describe('Navigation Handlers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete window.location;
    window.location = { href: '' };
    localStorage.clear();
  });

  test('handleAccount navigates to account.html', () => {
    handleAccount();
    expect(window.location.href).toBe('account.html');
  });

  test('handleNotification navigates to notifications.html', () => {
    handleNotification();
    expect(window.location.href).toBe('notifications.html');
  });

  test('handleHistory navigates to ../custHistory/index.html', () => {
    handleHistory();
    expect(window.location.href).toBe('../custHistory/index.html');
  });

  test('handleSignOut removes userSession and navigates to login.html', () => {
    localStorage.setItem('userSession', 'testSession');
    handleSignOut();
    expect(localStorage.getItem('userSession')).toBeNull();
    expect(window.location.href).toBe('../../Login_page/login.html');
  });
});

describe('checkLoginStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete window.location;
    window.location = { href: '', pathname: '/protected.html' };
    localStorage.clear();
  });

  test('redirects to login.html if no session on protected page', () => {
    checkLoginStatus();
    expect(window.location.href).toBe('login.html');
  });

  test('does not redirect if session exists on protected page', () => {
    localStorage.setItem('userSession', 'testSession');
    checkLoginStatus();
    expect(window.location.href).toBe('');
  });

  test('redirects to index.html if on login.html and session exists', () => {
    window.location.pathname = '/login.html';
    localStorage.setItem('userSession', 'testSession');
    checkLoginStatus();
    expect(window.location.href).toBe('index.html');
  });

  test('does not redirect on public pages if no session exists', () => {
    window.location.pathname = '/index.html';
    checkLoginStatus();
    expect(window.location.href).toBe('');
  });
});