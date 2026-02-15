import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock react-native-biometrics
jest.mock('react-native-biometrics', () => {
  return jest.fn().mockImplementation(() => {
    return {
      BiometryTypes: {
        TouchID: 'TouchID',
        FaceID: 'FaceID',
        Biometrics: 'Biometrics',
      },
      createKeys: jest.fn(() => Promise.resolve({ publicKey: 'mockPublicKey' })),
      biometricKeysExist: jest.fn(() => Promise.resolve({ keysExist: true })),
      deleteKeys: jest.fn(() => Promise.resolve({ keysDeleted: true })),
      createSignature: jest.fn(() => Promise.resolve({ success: true, signature: 'mockSignature' })),
      simplePrompt: jest.fn(() => Promise.resolve({ success: true })),
      isSensorAvailable: jest.fn(() => Promise.resolve({ available: true, biometryType: 'FaceID' })),
    };
  });
});

// Mock react-native-haptic-feedback
jest.mock('react-native-haptic-feedback', () => ({
  trigger: jest.fn(),
  HapticFeedbackTypes: {
    selection: 'selection',
    impactLight: 'impactLight',
    impactMedium: 'impactMedium',
    impactHeavy: 'impactHeavy',
    notificationSuccess: 'notificationSuccess',
    notificationWarning: 'notificationWarning',
    notificationError: 'notificationError',
  },
}));

// Mock react-native-toast-message
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
  __esModule: true,
  default: () => null,
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  Swipeable: ({ children }) => children,
  DrawerLayout: ({ children }) => children,
  State: {},
  PanGestureHandler: ({ children }) => children,
  BaseButton: ({ children }) => children,
  RectButton: ({ children }) => children,
  TapGestureHandler: ({ children }) => children,
  RotationGestureHandler: ({ children }) => children,
  FlingGestureHandler: ({ children }) => children,
  ForceTouchGestureHandler: ({ children }) => children,
  LongPressGestureHandler: ({ children }) => children,
  PinchGestureHandler: ({ children }) => children,
  NativeViewGestureHandler: ({ children }) => children,
  RawButton: ({ children }) => children,
  BorderlessButton: ({ children }) => children,
  TextInput: ({ children }) => children,
  ScrollView: ({ children }) => children,
  FlatList: ({ children }) => children,
  GestureHandlerRootView: ({ children }) => children,
  Directions: {},
}));

// Mock @react-navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
      setOptions: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    useFocusEffect: jest.fn(),
  };
});

// Silence console warnings during tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
