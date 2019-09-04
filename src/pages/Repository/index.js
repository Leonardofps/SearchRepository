import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, IssuesFilter, PageList } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    status: [
      { state: 'all', label: 'All issues', active: true },
      { state: 'open', label: 'Open issues', active: false },
      { state: 'closed', label: 'Closed issues', active: false },
    ],
    statusIndex: 0,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { status } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: status.find(f => f.active).state,
          per_page: 10,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadStatusIssues = async () => {
    const { match } = this.props;
    const { status, statusIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: status[statusIndex].state,
        per_page: 10,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handleStatus = async statusIndex => {
    await this.setState({ statusIndex });
    this.loadStatusIssues();
  };

  changePage = async action => {
    const { page } = this.state;
    await this.setState({
      page: action === 'next' ? page + 1 : page - 1,
    });

    this.loadStatusIssues(page);
  };

  render() {
    const {
      repository,
      issues,
      loading,
      status,
      statusIndex,
      page,
    } = this.state;

    if (loading) {
      return (
        <Loading loading={loading}>
          Loading
          <FaSpinner color="#FFF" size={30} />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar para repositórios anteriores</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <IssuesFilter active={statusIndex}>
            {status.map((stat, index) => (
              <button
                type="button"
                key={stat.label}
                onClick={() => this.handleStatus(index)}
              >
                {stat.label}
              </button>
            ))}
          </IssuesFilter>

          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <PageList>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.changePage('previous')}
          >
            Previous
          </button>
          <p>Page {page}</p>
          <button type="button" onClick={() => this.changePage('next')}>
            Next
          </button>
        </PageList>
      </Container>
    );
  }
}
