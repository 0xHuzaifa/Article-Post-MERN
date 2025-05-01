import { Avatar, Badge, Button, IconButton } from "@material-tailwind/react";
import "./App.css";

function App() {
  return (
    <>
      <p className="p-5 text-lg bg-red-200 text-white">this is a text</p>
      <div className="p-5 flex gap-4">
        <Button variant="filled">filled</Button>
        <Button variant="gradient">gradient</Button>
        <Button variant="outlined">outlined</Button>
        <Button variant="text">text</Button>
      </div>
      <div className="flex items-center gap-4 p-5">
        <Button loading={true}>Loading</Button>
        <Button variant="outlined" loading={true}>
          Loading
        </Button>
        <Button variant="text" loading={true}>
          Loading
        </Button>
        <Button className="rounded-full" loading={true}>
          Loading
        </Button>
      </div>
      <div className="p-5">
        <Button fullWidth>block level button</Button>;
      </div>

      <div className="p-5">
        <IconButton>
          <i className="fas fa-heart" />
        </IconButton>
      </div>

      <div className="flex gap-4">
        <IconButton className="rounded bg-[#ea4335] hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
          <i className="fab fa-google text-lg" />
        </IconButton>
        <IconButton className="rounded bg-[#1DA1F2] hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10">
          <i className="fab fa-twitter text-lg" />
        </IconButton>
        <IconButton className="rounded bg-[#ea4c89] hover:shadow-[#ea4c89]/20 focus:shadow-[#ea4c89]/20 active:shadow-[#ea4c89]/10">
          <i className="fab fa-dribbble text-lg" />
        </IconButton>
        <IconButton className="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10">
          <i className="fab fa-github text-lg" />
        </IconButton>
      </div>

      <div className="flex gap-4">
        <Badge placement="top-end" overlap="circular" color="green" withBorder>
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
          />
        </Badge>
        <Badge placement="top-end" color="green" withBorder>
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            variant="rounded"
          />
        </Badge>
        <Badge placement="bottom-end" overlap="circular" color="red" withBorder>
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
          />
        </Badge>
        <Badge placement="bottom-end" color="red" withBorder>
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
            variant="rounded"
          />
        </Badge>
      </div>
    </>
  );
}

export default App;
