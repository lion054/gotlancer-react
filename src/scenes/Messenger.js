import React, { Fragment, PureComponent } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  Avatar,
  Button,
  ChatContainer,
  Conversation,
  ConversationHeader,
  ConversationList,
  Enums,
  InputToolbox,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  Search,
  Sidebar,
  TypingIndicator
} from '@chatscope/chat-ui-kit-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCog, faEdit, faEllipsisV, faPaperPlane, faPaperclip, faQuoteLeft, faSmile, faTrash } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emojione-picker';
import 'emojione-picker/css/picker.css';
import faker from 'faker';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { compose } from 'redux';

import Header from '../components/Header';
import './Messenger.css';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    '& .cs-main-container > .cs-sidebar.cs-sidebar--right': {
      borderLeft: `solid 1px ${theme.palette.divider}`
    },
    '& .cs-main-container .cs-chat-container': {
      borderRight: `solid 1px ${theme.palette.divider}`
    },
    '& .cs-message__content': {
      backgroundColor: theme.palette.action.selected
    },
    '& .cs-message--outgoing .cs-message__content': {
      backgroundColor: theme.palette.action.disabled
    },
    '& .cs-message.cs-message--incoming.cs-message--first .cs-message__content': {
      backgroundColor: theme.palette.action.selected
    },
    '& .cs-message.cs-message--outgoing.cs-message--first .cs-message__content': {
      backgroundColor: theme.palette.action.disabled
    },
    '& .cs-message-group__messages .cs-message .cs-message__content': {
      backgroundColor: theme.palette.action.selected
    },
    '& .cs-message-group--incoming .cs-message-group__messages .cs-message .cs-message__content': {
      backgroundColor: theme.palette.action.selected
    },
    '& .cs-message-group--outgoing .cs-message-group__messages .cs-message .cs-message__content': {
      backgroundColor: theme.palette.action.disabled
    },
    '& .cs-message-separator': {
      color: theme.palette.action.disabled
    },
    '& .cs-message-separator::before, .cs-message-separator::after': {
      backgroundColor: theme.palette.action.disabled
    },
    '& .cs-avatar-group--xs .cs-avatar': {
      borderRight: `1px solid ${theme.palette.background.default}`
    },
    '& .cs-avatar-group--md .cs-avatar': {
      border: `2px solid ${theme.palette.background.default}`
    },
    '& .cs-avatar-group--lg .cs-avatar': {
      border: `2px solid ${theme.palette.background.default}`
    },
    '& .cs-message-input__content-editor-wrapper': {
      backgroundColor: theme.palette.action.selected
    },
    '& .cs-message-input--disabled .cs-message-input__content-editor-wrapper': {
      backgroundColor: 'unset'
    },
    '& .cs-message-input__content-editor-container': {
      backgroundColor: 'unset'
    },
    '& .cs-message-input__content-editor': {
      backgroundColor: 'unset'
    },
    '& .cs-chat-container .cs-message-input': {
      borderTop: `solid 1px ${theme.palette.action.divider}`
    },
    '& .cs-typing-indicator__dot': {
      backgroundColor: theme.palette.action.active
    },
    '& .cs-typing-indicator__text': {
      color: theme.palette.action.active
    },
    '& .cs-conversation-header': {
      backgroundColor: theme.palette.background.default,
      borderBottom: `solid 1px ${theme.palette.divider}`
    },
    '& .cs-conversation-header__avatar > .cs-avatar > .cs-status > .cs-status__bullet': {
      borderColor: theme.palette.background.default
    },
    '& .cs-conversation-header__content .cs-conversation-header__user-name': {
      backgroundColor: theme.palette.background.default
    },
    '& .cs-conversation-header__content .cs-conversation-header__info': {
      backgroundColor: theme.palette.background.default
    },
    '& .cs-conversation:hover': {
      backgroundColor: theme.palette.action.hover
    },
    '& .cs-conversation:hover > .cs-avatar > .cs-status > .cs-status__bullet': {
      borderColor: theme.palette.action.hover
    },
    '& .cs-conversation.cs-conversation:active': {
      backgroundColor: theme.palette.action.selected
    },
    '& .cs-conversation.cs-conversation:active > .cs-avatar > .cs-status > .cs-status__bullet': {
      borderColor: theme.palette.action.selected
    },
    '& .cs-conversation.cs-conversation--active': {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.action.selected
    },
    '& .cs-conversation.cs-conversation--active > .cs-avatar > .cs-status > .cs-status__bullet': {
      borderColor: theme.palette.action.selected
    },
    '& .cs-conversation.cs-conversation--active .cs-conversation__name': {
      color: theme.palette.text.primary
    },
    '& .cs-conversation.cs-conversation--active .cs-conversation__info': {
      color: theme.palette.text.secondary
    },
    '& .cs-conversation__unread-dot': {
      background: `radial-gradient(circle at 3px 3px, ${theme.palette.action.disabled}, ${theme.palette.action.active})`
    },
    '& .cs-conversation__unread': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.success.main,
      minWidth: 16,
      borderRadius: 8
    },
    '& .cs-status--selected': {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.action.selected
    },
    '& .cs-status--available .cs-status__bullet': {
      background: `radial-gradient(circle at 3px 3px, ${theme.palette.success.main}, ${theme.palette.success.dark})`
    },
    '& .cs-status--unavailable .cs-status__bullet': {
      background: `radial-gradient(circle at 3px 3px, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`
    },
    '& .cs-status--away .cs-status__bullet': {
      background: `radial-gradient(circle at 3px 3px, ${theme.palette.error.main}, ${theme.palette.error.dark})`
    },
    '& .cs-status--dnd .cs-status__bullet': {
      background: `radial-gradient(circle at 3px 3px, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`
    },
    '& .cs-status--invisible .cs-status__bullet': {
      background: `radial-gradient(circle at 3px 3px, ${theme.palette.background.paper}, ${theme.palette.action.selected})`
    },
    '& .cs-status--eager .cs-status__bullet': {
      background: `radial-gradient(circle at 3px 3px, ${theme.palette.info.main}, ${theme.palette.info.dark})`
    },
    '& .cs-expansion-panel': {
      border: `solid 1px ${theme.palette.divider}`
    },
    '& .cs-expansion-panel__header': {
      backgroundColor: theme.palette.background.default
    },
    '& .cs-expansion-panel__header:hover': {
      backgroundColor: theme.palette.action.hover
    },
    '& .cs-expansion-panel--open .cs-expansion-panel__header': {
      backgroundColor: theme.palette.action.selected
    },
    '& .cs-search': {
      backgroundColor: 'unset',
      borderColor: theme.palette.divider,
      borderStyle: 'solid',
      borderWidth: 1
    },
    '& .cs-search__input': {
      backgroundColor: 'unset'
    },
    '.cs-search__input:disabled': {
      backgroundColor: 'unset'
    },
    '& .cs-search__search-icon': {
      color: theme.palette.success.main
    },
    '& .cs-search__clear-icon': {
      color: theme.palette.success.main
    },
    '.cs-search--disabled': {
      backgroundColor: 'unset'
    },
    '& .cs-button': {
      color: theme.palette.text.secondary
    },
    '& .cs-button.cs-button--border': {
      border: `solid 1px ${theme.palette.divider}`
    },
    '& .cs-button--adduser': {
      color: theme.palette.text.secondary
    },
    '& .cs-button--arrow': {
      color: theme.palette.text.secondary
    },
    '& .cs-button--ellipsis': {
      color: theme.palette.text.secondary
    },
    '& .cs-button--info': {
      color: theme.palette.text.secondary
    },
    '& .cs-button--star': {
      color: theme.palette.text.secondary
    },
    '& .cs-button--videocall': {
      color: theme.palette.text.secondary
    },
    '& .cs-button--voicecall': {
      color: theme.palette.text.secondary
    },
    '& .cs-button--send': {
      color: theme.palette.text.secondary
    },
    '& .cs-button--attachment': {
      color: theme.palette.text.secondary
    },
    '& .cs-loader::before': {
      borderColor: theme.palette.primary.main
    },
    '& .cs-loader::after': {
      borderColor: `${theme.palette.primary.dark} transparent transparent transparent`
    },
    '& .cs-status-list > li .cs-status--selected': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default
    },
    '& .cs-status-list > li .cs-status--selected .cs-status__name': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default
    },
    '& .cs-status-list > li:hover': {
      backgroundColor: theme.palette.action.hover
    },
    '& .cs-status-list > li:focus': {
      backgroundColor: theme.palette.background.default
    },
    '& .cs-status-list > li:active': {
      backgroundColor: theme.palette.background.default
    },
    '& .ps__thumb-x': {
      backgroundColor: theme.palette.action.active
    },
    '& .ps__thumb-y': {
      backgroundColor: theme.palette.action.active
    }
  },
  menuItem: {
    '&:hover > .MuiListItemIcon-root > .MuiBox-root > svg': {
      color: theme.palette.info.main
    },
    '&:hover > .MuiListItemText-root > .MuiTypography-root': {
      color: theme.palette.info.main
    }
  },
  menuIcon: {
    minWidth: 'unset',
    marginRight: theme.spacing(2)
  },
  sidebarFullWidth: {
    maxWidth: 'unset !important',
    flexBasis: 'unset !important'
  }
});

class Messenger extends PureComponent {
  state = {
    search: '',
    conversations: [],
    activeIndex: -1,
    currentConversation: {},
    showOnlyRooms: false,
    messages: [],
    text: '',
    moreEl: null,
    moreId: '',
    dialogOpened: false,
    typing: '',
    timer: null,
    emojiEl: null,
    settingEl: null,
    enterMode: 'send'
  }

  componentDidMount() {
    const conversations = this.fetchConversations('');
    this.setState({
      conversations,
      activeIndex: 0,
      currentConversation: {
        ...conversations[0]
      },
      messages: this.fetchRecentMessages(conversations[0])
    });
    this.simulateRandomeTyping();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  simulateRandomeTyping() {
    const waitingTime = faker.random.number({ min: 5000, max: 10000 });
    this.timer = setTimeout(() => {
      this.setState({
        typing: faker.random.boolean() ? 'Patrik is typing' : ''
      });
      this.simulateRandomeTyping();
    }, waitingTime);
  }

  fetchConversations(search) {
    const { StatusEnum } = Enums;
    const conversations = [];
    for (let i = 0; i < 20; i++) {
      const name = faker.name.findName();
      conversations.push({
        name,
        lastSender: faker.random.boolean() ? name : 'You',
        lastMessage: faker.lorem.sentence(),
        avatar: faker.image.image(),
        status: StatusEnum[faker.random.number({ min: 0, max: StatusEnum.length - 1 })],
        lastTime: faker.date.past(),
        unread: faker.random.number({ min: 0, max: 30 })
      });
    }
    if (!search) {
      return conversations;
    }
    return conversations.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));
  }

  fetchRecentMessages({ name }) {
    const messages = [];
    for (let i = 0; i < 20; i++) {
      const direction = faker.random.boolean() ? 'incoming' : 'outgoing';
      messages.push({
        id: uuidv4(),
        text: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        modifiedAt: faker.random.boolean() ? faker.date.past() : undefined,
        sender: direction === 'incoming' ? name : 'You',
        direction
      });
    }
    this.fixPositionInMessages(messages);
    return messages;
  }

  fixPositionInMessages(messages) {
    if (messages.length === 0) {
      return;
    }
    if (messages.length === 1) {
      messages[0].position = 'single';
      return;
    }
    for (let i = 0; i < messages.length; i++) {
      if (i === 0) {
        messages[i].position = (messages[i].direction === messages[i + 1].direction) ? 'first' : 'single';
      } else if (i === messages.length - 1) {
        messages[i].position = (messages[i].direction === messages[i - 1].direction) ? 'last' : 'single';
      } else {
        if (messages[i].direction !== messages[i - 1].direction && messages[i].direction !== messages[i + 1].direction) {
          messages[i].position = 'single';
        } else if (messages[i].direction !== messages[i - 1].direction) {
          messages[i].position = 'first';
        } else if (messages[i].direction !== messages[i + 1].direction) {
          messages[i].position = 'last';
        } else {
          messages[i].position = 'normal';
        }
      }
    }
  }

  onOpenConversation(index) {
    this.setState({
      activeIndex: index,
      currentConversation: {
        ...this.state.conversations[index]
      },
      messages: this.fetchRecentMessages(this.state.conversations[index]),
      showOnlyRooms: false
    });
  }

  onSearchConversation = (search) => {
    this.setState({
      search,
      conversations: this.fetchConversations(search),
      activeIndex: -1
    });
  }

  formaatLastTime(date) {
    const past = moment(date);
    const now = moment();
    if (now.diff(past, 'years') >= 1) {
      return past.format('MM/DD/YYYY'); // 12/25/2020
    }
    if (now.diff(past, 'days') >= 7) {
      return past.format('MM/DD'); // 12/25
    }
    if (now.diff(past, 'days') >= 2) {
      return past.format('dddd'); // Monday
    }
    if (now.diff(past, 'days') === 1) {
      return 'Yesterday';
    }
    return past.format('LT'); // 0:30 PM
  }

  onOpenMoreMenu = (e, id) => this.setState({
    moreEl: e.currentTarget,
    moreId: id
  })

  onCloseMoreMenu = () => this.setState({
    moreEl: null,
    moreId: ''
  })

  onOpenDialog = () => this.setState({ dialogOpened: true })

  onCloseDialog = () => this.setState({ dialogOpened: false })

  handleAttach = (e) => {
    console.log(e);
  }

  onOpenEmojiPopover = (event) => this.setState({ emojiEl: event.currentTarget })

  onCloseEmojiPopover = () => this.setState({ emojiEl: null })

  handleEmoji = (data) => {
    console.log(data);
    // this.setState({
    //   text: this.state.text + emojiObject.emoji
    // });
  }

  handleSend = () => {
    this.setState({ text: '' });
  }

  onOpenSettingPopover = (event) => this.setState({ settingEl: event.currentTarget })

  onCloseSettingPopover = () => this.setState({ settingEl: null })

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <div style={{
        height: 'calc(100% - 64px - 36px)' // Exclude header and footer
      }}>
        <MainContainer responsive={!this.state.showOnlyRooms}>
          <Sidebar position="left" className={this.state.showOnlyRooms ? this.props.classes.sidebarFullWidth : ''}>
            <Search
              placeholder="Search..."
              value={this.state.search}
              onChange={this.onSearchConversation}
              onClearClick={() => this.onSearchConversation('')}
            />
            <ConversationList>
              {this.state.conversations.map(({ name, lastSender, lastMessage, avatar, status, lastTime, unread }, index) => (
                <Conversation
                  key={index}
                  name={name}
                  lastSenderName={lastSender}
                  info={lastMessage}
                  lastActivityTime={this.formaatLastTime(lastTime)}
                  unreadCnt={unread}
                  active={index === this.state.activeIndex}
                  onClick={() => this.onOpenConversation(index)}
                >
                  <Avatar src={avatar} name={name} status={status} />
                </Conversation>
              ))}
            </ConversationList>
          </Sidebar>
          <ChatContainer style={{
            display: this.state.showOnlyRooms ? 'none' : 'flex',
            flex: 1
          }}>
            <ConversationHeader>
              <ConversationHeader.Back onClick={() => this.setState({ showOnlyRooms: true })} />
              {this.state.activeIndex !== -1 && (
                <Avatar
                  src={this.state.currentConversation.avatar}
                  name={this.state.currentConversation.name}
                />
              )}
              {this.state.activeIndex !== -1 && (
                <ConversationHeader.Content
                  userName={this.state.currentConversation.name}
                  info={`Active ${moment(this.state.currentConversation.lastTime).fromNow()}`}
                />
              )}
            </ConversationHeader>
            <MessageList>
              {this.state.messages.map(({ id, text, createdAt, modifiedAt, sender, direction, position }, index) => (direction === 'incoming' && (position === 'single' || position === 'last')) ? (
                <Message key={index} model={{
                  sentTime: moment(createdAt).fromNow(),
                  sender,
                  direction,
                  position,
                  type: 'custom'
                }}>
                  <Avatar
                    src={this.state.currentConversation.avatar}
                    name={this.state.currentConversation.name}
                  />
                  <Message.CustomContent>
                    <Box>
                      <Box>
                        <span>{text}</span>
                        <Button className="msg-more-action" onClick={(e) => this.onOpenMoreMenu(e, id)} icon={(
                          <FontAwesomeIcon icon={faEllipsisV} />
                        )} />
                        {this.renderMoreMenu(id)}
                      </Box>
                      {modifiedAt && (
                        <Box>
                          <Tooltip title={`Edited on ${moment(modifiedAt).format('LLLL')}`}>
                            <Typography variant="body2" color="textSecondary">(edited)</Typography>
                          </Tooltip>
                        </Box>
                      )}
                    </Box>
                  </Message.CustomContent>
                </Message>
              ) : (
                <Message key={index} avatarSpacer={direction === 'incoming'} model={{
                  sentTime: moment(createdAt).fromNow(),
                  sender,
                  direction,
                  position,
                  type: 'custom'
                }}>
                  <Message.CustomContent>
                    <Box>
                      <Box>
                        {direction === 'outgoing' && (
                          <Fragment>
                            <Button className="msg-more-action" onClick={(e) => this.onOpenMoreMenu(e, id)} icon={(
                              <FontAwesomeIcon icon={faEllipsisV} />
                            )} />
                            {this.renderMoreMenu(id)}
                          </Fragment>
                        )}
                        <span>{text}</span>
                        {direction === 'incoming' && (
                          <Fragment>
                            <Button className="msg-more-action" onClick={(e) => this.onOpenMoreMenu(e, id)} icon={(
                              <FontAwesomeIcon icon={faEllipsisV} />
                            )} />
                            {this.renderMoreMenu(id)}
                          </Fragment>
                        )}
                      </Box>
                      {modifiedAt && (
                        <Box>
                          <Tooltip title={`Edited on ${moment(modifiedAt).format('LLLL')}`}>
                            <Typography variant="body2" color="textSecondary" align={direction === 'outgoing' ? 'right' : 'left'}>(edited)</Typography>
                          </Tooltip>
                        </Box>
                      )}
                    </Box>
                  </Message.CustomContent>
                </Message>
              ))}
            </MessageList>
            <InputToolbox>
              <Box height={21}>
                {!!this.state.typing && (
                  <TypingIndicator content={this.state.typing} />
                )}
              </Box>
              <div style={{
                display: 'flex',
                borderTop: 'solid 1px #d1dbe4'
              }}>
                <input
                  id="contained-button-file"
                  multiple
                  type="file"
                  style={{ display: 'none' }}
                  onChange={this.handleAttach}
                />
                <label htmlFor="contained-button-file">
                  <div className="cs-button" style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <FontAwesomeIcon icon={faPaperclip} />
                  </div>
                </label>
                <Button onClick={this.onOpenEmojiPopover} icon={(
                  <FontAwesomeIcon icon={faSmile} />
                )} />
                {this.renderEmojiPopover()}
                <MessageInput
                  placeholder="Type message here"
                  attachButton={false}
                  sendButton={false}
                  value={this.state.text}
                  onChange={(text) => this.setState({ text })}
                />
                <Button onClick={this.handleSend} icon={(
                  <FontAwesomeIcon icon={faPaperPlane} />
                )} />
                <Button onClick={this.onOpenSettingPopover} icon={(
                  <FontAwesomeIcon icon={faCog} />
                )} />
                {this.renderSettingPopover()}
              </div>
            </InputToolbox>
          </ChatContainer>
        </MainContainer>
      </div>
      <Box mt={1} mb={1} justifyContent="center">
        <Typography variant="body2" color="textSecondary" align="center">&copy; 2020 Gotlancer, Inc. All rights reserved.</Typography>
      </Box>
      {this.rnederDialog()}
    </div>
  )

  renderMoreMenu = (id) => (
    <Menu
      id={`${id}-more-menu`}
      anchorEl={this.state.moreEl}
      keepMounted
      open={this.state.moreId === id}
      onClose={this.onCloseMoreMenu}
      getContentAnchorEl={null} // menu should be display below anchor
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // menu should be display below anchor
    >
      <MenuItem onClick={() => {
        this.onCloseMoreMenu();
        this.onOpenDialog();
      }} className={this.props.classes.menuItem}>
        <ListItemIcon>
          <Box mr={1.5} width="100%" textAlign="center">
            <FontAwesomeIcon className={this.props.classes.menuIcon} icon={faTrash} />
          </Box>
        </ListItemIcon>
        <ListItemText primary="Delete" primaryTypographyProps={{
          variant: 'body1',
          color: 'textPrimary'
        }} />
      </MenuItem>
      <MenuItem onClick={this.onCloseMoreMenu} className={this.props.classes.menuItem}>
        <ListItemIcon>
          <Box mr={1.5} width="100%" textAlign="center">
            <FontAwesomeIcon className={this.props.classes.menuIcon} icon={faEdit} />
          </Box>
        </ListItemIcon>
        <ListItemText primary="Edit" primaryTypographyProps={{
          variant: 'body1',
          color: 'textPrimary'
        }} />
      </MenuItem>
      <MenuItem onClick={this.onCloseMoreMenu} className={this.props.classes.menuItem}>
        <ListItemIcon>
          <Box mr={1.5} width="100%" textAlign="center">
            <FontAwesomeIcon className={this.props.classes.menuIcon} icon={faQuoteLeft} />
          </Box>
        </ListItemIcon>
        <ListItemText primary="Quote" primaryTypographyProps={{
          variant: 'body1',
          color: 'textPrimary'
        }} />
      </MenuItem>
    </Menu>
  )

  rnederDialog = () => (
    <Dialog
      open={this.state.dialogOpened}
      onClose={this.onCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete message</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Are you sure to delete this message record?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.onCloseDialog} color="primary">No</Button>
        <Button onClick={this.onCloseDialog} color="primary" autoFocus>Yes</Button>
      </DialogActions>
    </Dialog>
  )

  renderEmojiPopover = () => (
    <Popover
      id="emoji-menu"
      anchorEl={this.state.emojiEl}
      open={!!this.state.emojiEl}
      onClose={this.onCloseEmojiPopover}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Box width={this.props.theme.spacing(35)} m={2}>
        <EmojiPicker
          search={true}
          // categories={{
          //   people: {
          //     title: 'People',
          //     emoji: 'smile'
          //   },
          //   nature: {
          //     title: 'Nature',
          //     emoji: 'mouse'
          //   },
          //   food: {
          //     title: 'Food & Drink',
          //     emoji: 'burger'
          //   }
          // }}
          // emojione={{
          //   imageType: 'svg',
          //   sprites: true,
          //   imagePathSVGSprites: '../node_modules/emojione/assets/sprites/emojione.sprites.svg'
          // }}
          emojione={{
            imageType: 'png',
            sprites: true
          }}
          onChange={this.handleEmoji}
        />
      </Box>
    </Popover>
  )

  renderSettingPopover = () => (
    <Popover
      id="setting-menu"
      anchorEl={this.state.settingEl}
      open={!!this.state.settingEl}
      onClose={this.onCloseSettingPopover}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Box width={this.props.theme.spacing(30)} m={2}>
        <Box mb={1}>
          <Typography variant="body2">Pressing Enter Key will:</Typography>
        </Box>
        <MenuItem className={this.props.classes.menuItem} onClick={() => {
          this.setState({ enterMode: 'send' });
          this.onCloseSettingPopover();
        }}>
          <ListItemIcon className={this.props.classes.menuIcon}>
            <FontAwesomeIcon icon={faCheckCircle} color={this.state.enterMode === 'send' ? this.props.theme.palette.success.main : this.props.theme.palette.text.secondary} />
          </ListItemIcon>
          <ListItemText primary="Send a message" primaryTypographyProps={{
            variant: 'body1',
            style: {
              color: this.state.enterMode === 'send' ? this.props.theme.palette.success.main : this.props.theme.palette.text.primary
            }
          }} />
        </MenuItem>
        <MenuItem className={this.props.classes.menuItem} onClick={() => {
          this.setState({ enterMode: 'line-break' });
          this.onCloseSettingPopover();
        }}>
          <ListItemIcon className={this.props.classes.menuIcon}>
            <FontAwesomeIcon icon={faCheckCircle} color={this.state.enterMode === 'line-break' ? this.props.theme.palette.success.main : this.props.theme.palette.text.secondary} />
          </ListItemIcon>
          <ListItemText primary="Add a line break" primaryTypographyProps={{
            variant: 'body1',
            style: {
              color: this.state.enterMode === 'line-break' ? this.props.theme.palette.success.main : this.props.theme.palette.text.primary
            }
          }} />
        </MenuItem>
        <Box mt={1}>
          <Typography variant="body2">You can always use Shift+Enter or Ctrl+Enter to type multi-line messages.</Typography>
        </Box>
      </Box>
    </Popover>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Messenger);