import PropTypes from "prop-types";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import ChevronRightIcon from "../../styles/icons/chevron-right.svg";
import BarIcon from "../../styles/icons/vertical-bar.svg";
import list2Tree from "../../utilities/list2Tree/index.js";

export default class SidebarItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    anchors: PropTypes.array,
    url: PropTypes.string,
    currentPage: PropTypes.string,
  };

  state = {
    open: this._isOpen(this.props),
  };

  scrollTop(event) {
    // there're two cases
    // 1. location.pathname or location.hash changes which will be handled by useEffect in Page.jsx
    // 2. location.pathname and location.hash doesn't change at all
    if (window.location.hash !== "") {
      // case 1
      return;
    }
    if (!event.metaKey && !event.ctrlKey) {
      // case 2
      window.scrollTo(0, 0);
    }
  }

  renderAnchors(anchors) {
    return (
      <ul className="relative flex flex-[0_0_100%] flex-wrap my-[0.35em] pl-[1.5em] overflow-hidden list-none leading-[19px] before:content-[''] before:absolute before:h-[calc(100%-0.6em)] before:top-0 before:left-[1.5em] before:border-l before:border-dashed before:border-dusty-grey">
        {anchors.map((anchor) => (
          <li
            key={this._generateAnchorURL(anchor)}
            className="relative flex-[0_0_100%] my-[0.25em] pl-[1em] truncate first:mt-0 last:mb-0 before:content-[''] before:absolute before:w-[0.5em] before:left-0 before:top-[10px] before:border-b before:border-dashed before:border-dusty-grey"
            title={anchor.title}
          >
            <NavLink
              to={this._generateAnchorURL(anchor)}
              className="text-elephant hover:text-denim"
            >
              {anchor.title2}
            </NavLink>
            {anchor.children && this.renderAnchors(anchor.children)}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { title, anchors = [] } = this.props;
    const { open } = this.state;
    const isDisabled = anchors.length === 0;

    const filteredAnchors = anchors.filter((anchor) => anchor.level > 1);
    const tree = list2Tree(title, filteredAnchors);

    return (
      <div className="relative flex flex-wrap text-[15px] my-[0.6em]">
        {anchors.length > 0 ? (
          <button
            className="bg-transparent border-none p-0 flex items-center"
            onClick={this._toggle.bind(this)}
            aria-label={`Toggle ${title} section`}
            aria-expanded={open}
          >
            <ChevronRightIcon
              width={15}
              height={17}
              fill="#175d96"
              className={`shrink-0 mt-[0.125em] mr-[0.5em] cursor-pointer text-denim transition-all duration-[250ms] hover:text-mine-shaft ${
                open ? "rotate-90 origin-center" : ""
              } ${isDisabled ? "text-[#aaa]" : ""}`}
            />
          </button>
        ) : (
          <BarIcon
            className={`shrink-0 mt-[0.125em] mr-[0.5em] cursor-pointer text-denim transition-all duration-[250ms] hover:text-mine-shaft ${
              isDisabled ? "text-[#aaa]" : ""
            }`}
            width={15}
            height={17}
            fill="#175d96"
          />
        )}

        <NavLink
          end
          key={this.props.url}
          className={({ isActive }) =>
            `flex-1 text-elephant max-w-[85%] truncate ${
              isActive ? "font-semibold text-mine-shaft" : ""
            }`
          }
          to={this.props.url}
          onClick={this.scrollTop}
        >
          {title}
        </NavLink>

        {anchors.length > 0 && open ? this.renderAnchors(tree) : null}
      </div>
    );
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage !== this.props.currentPage) {
      this.setState({
        open: this._isOpen(nextProps),
      });
    }
  }

  /**
   * Checks whether the item should be expanded
   *
   * @param {object} props - The current props
   */
  _isOpen(props) {
    return new RegExp(`${props.currentPage}/?$`).test(props.url);
  }

  /**
   * Toggles the open state (expanded/collapsed)
   *
   * @param {object} e - Click event
   */
  _toggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  /**
   * Generate the url for the given [anchor] depending on the current page
   *
   * @param {object} anchor - The anchor object containing its id
   * @returns {string}
   */
  _generateAnchorURL(anchor) {
    const { url } = this.props;
    return anchor.id ? `${url}#${anchor.id}` : url;
  }
}
