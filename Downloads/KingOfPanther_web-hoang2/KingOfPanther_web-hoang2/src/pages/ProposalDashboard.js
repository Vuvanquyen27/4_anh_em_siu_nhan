import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProposalDashboard = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get('/api/proposals');
        setProposals(response.data);
      } catch (error) {
        console.error('Lỗi tải danh sách đề xuất', error);
      }
    };
    fetchProposals();
  }, []);

  return (
    <div>
      <h1>Bảng điều khiển đề xuất</h1>
      <h2>Danh sách các đề xuất:</h2>
      <ul>
        {proposals.map((proposal) => (
          <li key={proposal._id}>
            Tên đề xuất: {proposal.title} - Mô tả: {proposal.description} - Trạng thái: {proposal.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProposalDashboard;
