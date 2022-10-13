import { Component } from 'react';

interface MyState {
    subscribeToNewComments: () => void;
}

export class Chat extends Component<MyState> {
    componentDidMount() {
        this.props.subscribeToNewComments();
    }
}
