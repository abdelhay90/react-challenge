/**
 * used to configure enzyme with jest to be used while writing tests
 */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
