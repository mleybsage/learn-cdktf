import { Construct } from "constructs";
import * as cdktf from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { Instance } from "@cdktf/provider-aws/lib/instance";
import { SnowflakeProvider } from "@cdktf/provider-snowflake/lib/provider";

class MyStack extends cdktf.TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "us-west-1",
    });

    new SnowflakeProvider(this, "Snowflake", {
      account: "myaccount",
      username: "myusername"
    });

    const ec2Instance = new Instance(this, "compute", {
      ami: "ami-01456a894f71116f2",
      instanceType: "t2.micro",
    });

    new cdktf.TerraformOutput(this, "public_ip", {
      value: ec2Instance.publicIp,
    });
  }
}

const app = new cdktf.App();

new MyStack(app, "aws_instance");

app.synth();
