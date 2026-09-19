import Box from '@mui/material/Box';
import AltRouteOutlined from '@mui/icons-material/AltRouteOutlined';
import PendingOutlined from '@mui/icons-material/PendingOutlined';
import MergeOutlined from '@mui/icons-material/MergeOutlined';
import DoDisturbOutlined from '@mui/icons-material/DoDisturbOutlined';
import type { ReportJson } from '../../types';
import { colors } from '../../theme';
import { StatCard } from './StatCards';

interface PullRequestCardsProps {
  pullRequests: ReportJson['pullRequests'];
}

export default function PullRequestCards({ pullRequests }: PullRequestCardsProps) {
  if (!pullRequests) return null;

  const { totalPRs, openPRs, closedPRs, mergedPRs } = pullRequests;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      {[
        {
          title: 'Total Pull Requests',
          value: totalPRs,
          icon: <AltRouteOutlined />,
          color: colors.primary.dark,
        },
        {
          title: 'Open',
          value: openPRs,
          icon: <PendingOutlined />,
          color: colors.warning.dark,
        },
        {
          title: 'Merged',
          value: mergedPRs,
          icon: <MergeOutlined />,
          color: colors.success.light,
        },
        {
          title: 'Closed',
          value: closedPRs,
          icon: <DoDisturbOutlined />,
          color: colors.error.light,
        },
      ].map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </Box>
  );
}
