// 공지사항 타입
interface Notice {
  notice_id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// 그룹 타입
interface Group {
  group_id: number;
  name: string;
  password: string;
  group_category_name: string;
  group_image_path: string;
  description: string;
  daily_goal_time: number;
  maximum_number_member: number;
  is_camera_on: boolean;
  createdAt: Date;
  updatedAt: Date;
}
