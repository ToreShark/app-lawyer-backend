import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  VideoShowComponent: componentLoader.add(
    'VideoShowComponent',
    './VideoShowComponent',
  ),
};

export { componentLoader, Components };