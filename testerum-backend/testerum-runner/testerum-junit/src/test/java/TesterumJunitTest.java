import com.testerum.runner.junit5.TesterumJunitTestFactory;
import java.util.List;
import org.junit.jupiter.api.DynamicNode;
import org.junit.jupiter.api.TestFactory;

public class TesterumJunitTest {

    @TestFactory()
    public List<DynamicNode> testerumTests() {
        return new TesterumJunitTestFactory("../../../integration-tests/tests")
            .testPaths("backend")
            .getTests();
    }
}